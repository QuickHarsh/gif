import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/app/lib/db';
import Cart from '@/app/models/Cart';
import Order from '@/app/models/Order';
import Product from '@/app/models/Product';
import { cookies } from 'next/headers';
import { sendOrderConfirmationEmail } from '@/app/lib/email';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    const userId = session?.user?.id;
    const cookieStore = cookies();
    const sessionId = cookieStore.get('cartSessionId')?.value;
    
    const { 
      shippingAddress, 
      billingAddress, 
      shippingMethod,
      paymentInfo,
      guestEmail,
      notes
    } = await request.json();
    
    // Validate required fields
    if (!shippingAddress || !paymentInfo || !shippingMethod) {
      return NextResponse.json(
        { error: 'Shipping address, payment info, and shipping method are required' },
        { status: 400 }
      );
    }
    
    // If guest checkout, email is required
    if (!userId && !guestEmail) {
      return NextResponse.json(
        { error: 'Email is required for guest checkout' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Find cart
    let cart;
    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }
    
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }
    
    // Verify stock and update product quantities
    for (const item of cart.items) {
      if (item.saveForLater) continue; // Skip saved for later items
      
      const product = await Product.findById(item.product);
      if (!product || product.status !== 'published') {
        return NextResponse.json(
          { error: `Product ${product?.name || item.name} is no longer available` },
          { status: 400 }
        );
      }
      
      let availableQuantity;
      if (item.variant) {
        const variant = product.variants.id(item.variant);
        if (!variant) {
          return NextResponse.json(
            { error: `Variant for ${product.name} is no longer available` },
            { status: 400 }
          );
        }
        availableQuantity = variant.quantity;
        
        // Update variant quantity
        if (availableQuantity < item.quantity) {
          return NextResponse.json(
            { error: `Not enough stock available for ${product.name}` },
            { status: 400 }
          );
        }
        
        variant.quantity -= item.quantity;
      } else {
        availableQuantity = product.inventory.quantity;
        
        // Update product quantity
        if (availableQuantity < item.quantity) {
          return NextResponse.json(
            { error: `Not enough stock available for ${product.name}` },
            { status: 400 }
          );
        }
        
        product.inventory.quantity -= item.quantity;
      }
      
      await product.save();
    }
    
    // Create order
    const orderItems = cart.items
      .filter((item: any) => !item.saveForLater)
      .map((item: any) => ({
        product: item.product,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image,
      }));
    
    const order = new Order({
      user: userId,
      guestEmail: !userId ? guestEmail : undefined,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentInfo,
      shippingMethod,
      subtotal: cart.subtotal,
      tax: cart.tax,
      shipping: cart.shipping,
      discount: cart.discount,
      total: cart.total,
      couponCode: cart.coupon ? cart.coupon.code : undefined,
      notes,
    });
    
    await order.save();
    
    // Clear cart (keep saved for later items)
    const savedItems = cart.items.filter((item: any) => item.saveForLater);
    cart.items = savedItems;
    cart.subtotal = 0;
    cart.tax = 0;
    cart.shipping = 0;
    cart.discount = 0;
    cart.total = 0;
    cart.coupon = undefined;
    await cart.save();
    
    // Send order confirmation email
    try {
      const emailTo = userId ? session?.user?.email : guestEmail;
      if (emailTo) {
        await sendOrderConfirmationEmail(emailTo, order);
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Continue with order creation even if email fails
    }
    
    return NextResponse.json(
      { 
        message: 'Order placed successfully',
        order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during checkout' },
      { status: 500 }
    );
  }
}