import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/app/lib/db';
import Cart from '@/app/models/Cart';
import Product from '@/app/models/Product';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Helper to get or create cart
async function getOrCreateCart(userId?: string) {
  const cookieStore = cookies();
  let sessionId = cookieStore.get('cartSessionId')?.value;
  
  // Create a new session ID if none exists
  if (!sessionId) {
    sessionId = crypto.randomBytes(16).toString('hex');
    cookieStore.set('cartSessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  }
  
  let cart;
  
  if (userId) {
    // Find cart by user ID
    cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      // Check if there's a cart with this session ID
      const sessionCart = await Cart.findOne({ sessionId });
      
      if (sessionCart) {
        // Convert session cart to user cart
        sessionCart.user = userId;
        sessionCart.sessionId = undefined;
        cart = await sessionCart.save();
      } else {
        // Create new cart for user
        cart = await Cart.create({ user: userId });
      }
    }
  } else {
    // Find or create cart by session ID
    cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      cart = await Cart.create({ sessionId });
    }
  }
  
  return cart;
}

// Get cart
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    await connectDB();
    
    const cart = await getOrCreateCart(userId);
    
    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name slug defaultImage inventory.quantity'
    });
    
    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching the cart' },
      { status: 500 }
    );
  }
}

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    const { productId, variantId, quantity = 1 } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Get product
    const product = await Product.findById(productId);
    if (!product || product.status !== 'published') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if variant exists if variantId is provided
    let variant;
    let price;
    let availableQuantity;
    
    if (variantId) {
      variant = product.variants.id(variantId);
      if (!variant) {
        return NextResponse.json(
          { error: 'Variant not found' },
          { status: 404 }
        );
      }
      price = variant.salePrice || variant.price;
      availableQuantity = variant.quantity;
    } else {
      price = product.salePrice || product.basePrice;
      availableQuantity = product.inventory.quantity;
    }
    
    // Check if product is in stock
    if (availableQuantity < quantity) {
      return NextResponse.json(
        { error: 'Not enough stock available' },
        { status: 400 }
      );
    }
    
    // Get or create cart
    const cart = await getOrCreateCart(userId);
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex((item: any) => {
      if (variantId) {
        return item.product.toString() === productId && item.variant?.toString() === variantId;
      }
      return item.product.toString() === productId && !item.variant;
    });
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      
      // Check if new quantity exceeds available stock
      if (newQuantity > availableQuantity) {
        return NextResponse.json(
          { error: 'Not enough stock available' },
          { status: 400 }
        );
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price,
        name: product.name,
        image: variantId && variant.images?.length ? variant.images[0] : product.defaultImage,
      });
    }
    
    await cart.save();
    
    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name slug defaultImage inventory.quantity'
    });
    
    return NextResponse.json(
      { 
        message: 'Item added to cart',
        cart 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while adding to cart' },
      { status: 500 }
    );
  }
}

// Clear cart
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    await connectDB();
    
    const cart = await getOrCreateCart(userId);
    
    // Clear items
    cart.items = [];
    cart.subtotal = 0;
    cart.tax = 0;
    cart.shipping = 0;
    cart.discount = 0;
    cart.total = 0;
    cart.coupon = undefined;
    
    await cart.save();
    
    return NextResponse.json(
      { message: 'Cart cleared successfully', cart },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Clear cart error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while clearing the cart' },
      { status: 500 }
    );
  }
}