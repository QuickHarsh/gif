import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

// Remove specific product from wishlist
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const productId = params.id;
    
    await connectDB();
    
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if product is in wishlist
    const productIndex = user.wishlist.indexOf(productId);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found in wishlist' },
        { status: 404 }
      );
    }
    
    // Remove from wishlist
    user.wishlist.splice(productIndex, 1);
    await user.save();
    
    return NextResponse.json(
      { 
        message: 'Product removed from wishlist',
        productId
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Remove from wishlist error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while removing from wishlist' },
      { status: 500 }
    );
  }
}