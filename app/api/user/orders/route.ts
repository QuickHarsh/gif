import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

// Get user's orders
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id as string;
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    
    await connectDB();
    
    // Build filter
    const filter: any = { user: userId };
    
    // Filter by status if provided
    if (status) {
      filter.status = status;
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get orders
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'items.product',
        select: 'name slug defaultImage'
      });
    
    // Get total count for pagination
    const total = await Order.countDocuments(filter);
    
    return NextResponse.json(
      { 
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching orders' },
      { status: 500 }
    );
  }
}