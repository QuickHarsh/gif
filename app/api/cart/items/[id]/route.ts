import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/app/lib/db';
import Cart from '@/app/models/Cart';
import Product from '@/app/models/Product';
import { cookies } from 'next/headers';

// Update cart item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const cookieStore = cookies();
    const sessionId = cookieStore.get('cartSessionId')?.value;
    
    const itemId = params.id;
    const { quantity, saveForLater } = await request.json();
    
    if (quantity !== undefined && (isNaN(quantity) || quantity < 0)) {
      return NextResponse.json(
        { error: 'Quantity must be a positive number' },
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
    
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }
    
    // Find item in cart
    const item = cart.items.id(itemId);
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }
    
    // If updating quantity, check stock
    if (quantity !== undefined) {
      // Get product to check stock
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      let availableQuantity;
      if (item.variant) {
        const variant = product.variants.id(item.variant);
        if (!variant) {
          return NextResponse.json(
            { error: 'Variant not found' },
            { status: 404 }
          );
        }
        availableQuantity = variant.quantity;
      } else {
        availableQuantity = product.inventory.quantity;
      }
      
      if (quantity > availableQuantity) {
        return NextResponse.json(
          { error: 'Not enough stock available' },
          { status: 400 }
        );
      }
      
      // Update quantity
      item.quantity = quantity;
    }
    
    // Update save for later status if provided
    if (saveForLater !== undefined) {
      item.saveForLater = saveForLater;
    }
    
    await cart.save();
    
    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name slug defaultImage inventory.quantity'
    });
    
    return NextResponse.json(
      { 
        message: 'Cart item updated',
        cart 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update cart item error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while updating the cart item' },
      { status: 500 }
    );
  }
}

// Remove item from cart
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const cookieStore = cookies();
    const sessionId = cookieStore.get('cartSessionId')?.value;
    
    const itemId = params.id;
    
    await connectDB();
    
    // Find cart
    let cart;
    if (userId) {
      cart = await Cart.findOne({ user: userId });
    } else if (sessionId) {
      cart = await Cart.findOne({ sessionId });
    }
    
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }
    
    // Find item in cart
    const item = cart.items.id(itemId);
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      );
    }
    
    // Remove item
    item.remove();
    await cart.save();
    
    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name slug defaultImage inventory.quantity'
    });
    
    return NextResponse.json(
      { 
        message: 'Item removed from cart',
        cart 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Remove cart item error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while removing the cart item' },
      { status: 500 }
    );
  }
}