import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';
import Product from '@/app/models/Product';

// Get user's recently viewed products
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    await connectDB();
    
    const user = await User.findById(session.user.id)
      .populate({
        path: 'recentlyViewed',
        select: 'name slug price defaultImage inventory.quantity variants status',
        options: { limit }
      });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Filter out unpublished products
    const recentlyViewed = user.recentlyViewed.filter((product: any) => product.status === 'published');
    
    return NextResponse.json(
      { recentlyViewed },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get recently viewed error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching recently viewed products' },
      { status: 500 }
    );
  }
}

// Clear recently viewed products
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
    
    // Clear recently viewed products
    user.recentlyViewed = [];
    await user.save();
    
    return NextResponse.json(
      { message: 'Recently viewed products cleared' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Clear recently viewed error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while clearing recently viewed products' },
      { status: 500 }
    );
  }
}