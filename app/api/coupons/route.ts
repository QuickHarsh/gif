import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/app/lib/db';
import Cart from '@/app/models/Cart';
import { cookies } from 'next/headers';

// Mock coupon database
const COUPONS = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderAmount: 0,
    maxDiscount: 100,
    expiryDate: '2025-12-31',
    isActive: true,
    usageLimit: 1000,
    usageCount: 0,
    applicableProducts: [],
    excludedProducts: []
  },
  {
    code: 'SAVE20',
    type: 'percentage',
    value: 20,
    minOrderAmount: 100,
    maxDiscount: 50,
    expiryDate: '2025-12-31',
    isActive: true,
    usageLimit: 500,
    usageCount: 0,
    applicableProducts: [],
    excludedProducts: []
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    value: 100,
    minOrderAmount: 75,
    maxDiscount: null,
    expiryDate: '2025-12-31',
    isActive: true,
    usageLimit: 1000,
    usageCount: 0,
    applicableProducts: [],
    excludedProducts: []
  },
  {
    code: 'FLAT25',
    type: 'fixed',
    value: 25,
    minOrderAmount: 150,
    maxDiscount: null,
    expiryDate: '2025-12-31',
    isActive: true,
    usageLimit: 300,
    usageCount: 0,
    applicableProducts: [],
    excludedProducts: []
  }
];

// Apply coupon to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const cookieStore = cookies();
    const sessionId = cookieStore.get('cartSessionId')?.value;
    
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json(
        { error: 'Coupon code is required' },
        { status: 400 }
      );
    }
    
    // Find coupon
    const coupon = COUPONS.find(c => c.code === code.toUpperCase());
    
    if (!coupon) {
      return NextResponse.json(
        { error: 'Invalid coupon code' },
        { status: 400 }
      );
    }
    
    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json(
        { error: 'This coupon is no longer active' },
        { status: 400 }
      );
    }
    
    // Check if coupon has expired
    const now = new Date();
    const expiryDate = new Date(coupon.expiryDate);
    if (now > expiryDate) {
      return NextResponse.json(
        { error: 'This coupon has expired' },
        { status: 400 }
      );
    }
    
    // Check usage limit
    if (coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json(
        { error: 'This coupon has reached its usage limit' },
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
    
    // Check minimum order amount
    if (cart.subtotal < coupon.minOrderAmount) {
      return NextResponse.json(
        { 
          error: `This coupon requires a minimum order of $${coupon.minOrderAmount}` 
        },
        { status: 400 }
      );
    }
    
    // Calculate discount
    let discountAmount = 0;
    
    switch (coupon.type) {
      case 'percentage':
        discountAmount = (cart.subtotal * coupon.value) / 100;
        // Apply max discount if specified
        if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
          discountAmount = coupon.maxDiscount;
        }
        break;
      
      case 'fixed':
        discountAmount = coupon.value;
        // Ensure discount doesn't exceed cart subtotal
        if (discountAmount > cart.subtotal) {
          discountAmount = cart.subtotal;
        }
        break;
      
      case 'shipping':
        discountAmount = Math.min(cart.shipping, coupon.value);
        break;
    }
    
    // Round to 2 decimal places
    discountAmount = parseFloat(discountAmount.toFixed(2));
    
    // Apply coupon to cart
    cart.coupon = {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discountAmount
    };
    
    cart.discount = discountAmount;
    
    // Recalculate total
    cart.total = parseFloat((cart.subtotal + cart.tax + cart.shipping - cart.discount).toFixed(2));
    
    await cart.save();
    
    // Increment coupon usage count (in a real app, this would be in the database)
    coupon.usageCount++;
    
    return NextResponse.json(
      { 
        message: 'Coupon applied successfully',
        cart
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Apply coupon error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while applying the coupon' },
      { status: 500 }
    );
  }
}

// Remove coupon from cart
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const cookieStore = cookies();
    const sessionId = cookieStore.get('cartSessionId')?.value;
    
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
    
    // Check if cart has a coupon
    if (!cart.coupon) {
      return NextResponse.json(
        { message: 'No coupon to remove' },
        { status: 200 }
      );
    }
    
    // Remove coupon
    cart.coupon = undefined;
    cart.discount = 0;
    
    // Recalculate total
    cart.total = parseFloat((cart.subtotal + cart.tax + cart.shipping).toFixed(2));
    
    await cart.save();
    
    return NextResponse.json(
      { 
        message: 'Coupon removed successfully',
        cart
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Remove coupon error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while removing the coupon' },
      { status: 500 }
    );
  }
}