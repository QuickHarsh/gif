import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';
import Product from '@/app/models/Product';

// Get user's wishlist
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const user = await User.findById(session.user.id)
      .populate({
        path: 'wishlist',
        select: 'name slug price defaultImage inventory.quantity variants status'
      });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Filter out unpublished products
    const wishlist = user.wishlist.filter((product: any) => product.status === 'published');
    
    return NextResponse.json(
      { wishlist },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get wishlist error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching wishlist' },
      { status: 500 }
    );
  }
}

// Add product to wishlist
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Check if product exists and is published
    const product = await Product.findById(productId);
    if (!product || product.status !== 'published') {
      return NextResponse.json(
        { error: 'Product not found or unavailable' },
        { status: 404 }
      );
    }
    
    // Add to wishlist if not already there
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if product is already in wishlist
    if (user.wishlist.includes(productId)) {
      return NextResponse.json(
        { message: 'Product already in wishlist' },
        { status: 200 }
      );
    }
    
    // Add to wishlist
    user.wishlist.push(productId);
    await user.save();
    
    return NextResponse.json(
      { 
        message: 'Product added to wishlist',
        productId
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Add to wishlist error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while adding to wishlist' },
      { status: 500 }
    );
  }
}

// Remove all products from wishlist
export async function DELETE() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Clear wishlist
    user.wishlist = [];
    await user.save();
    
    return NextResponse.json(
      { message: 'Wishlist cleared' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Clear wishlist error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while clearing wishlist' },
      { status: 500 }
    );
  }
}