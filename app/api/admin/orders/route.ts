import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

// Get all orders (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const search = searchParams.get('search') || '';
    
    await connectDB();
    
    // Build filter
    const filter: any = {};
    
    // Filter by status if provided
    if (status) {
      filter.status = status;
    }
    
    // Search by order number, customer email, or customer name
    if (search) {
      filter.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { guestEmail: { $regex: search, $options: 'i' } },
        { 'shippingAddress.fullName': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Build sort options
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Get orders
    const orders = await Order.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'user',
        select: 'name email'
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
    console.error('Admin get orders error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching orders' },
      { status: 500 }
    );
  }
}