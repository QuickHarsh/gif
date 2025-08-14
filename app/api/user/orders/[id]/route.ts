import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

// Get specific order details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id as string;
    const isAdmin = session.user.role === 'admin';
    
    // Authentication check already done above
    
    const orderId = params.id;
    
    await connectDB();
    
    // Find order
    const order = await Order.findById(orderId)
      .populate({
        path: 'items.product',
        select: 'name slug defaultImage'
      });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check if user is authorized to view this order
    if (!isAdmin && order.user?.toString() !== userId) {
      return NextResponse.json(
        { error: 'Not authorized to view this order' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      { order },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get order details error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching order details' },
      { status: 500 }
    );
  }
}

// Cancel order (only if status is pending or processing)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const userId = session.user.id as string;
    const isAdmin = session.user.role === 'admin';
    
    // Authentication check already done above
    
    const orderId = params.id;
    const { action } = await request.json();
    
    if (action !== 'cancel') {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Find order
    const order = await Order.findById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check if user is authorized to modify this order
    if (!isAdmin && order.user?.toString() !== userId) {
      return NextResponse.json(
        { error: 'Not authorized to modify this order' },
        { status: 403 }
      );
    }
    
    // Check if order can be cancelled
    if (!['pending', 'processing'].includes(order.status)) {
      return NextResponse.json(
        { error: `Cannot cancel order in ${order.status} status` },
        { status: 400 }
      );
    }
    
    // Update order status
    order.status = 'cancelled';
    order.statusHistory.push({
      status: 'cancelled',
      timestamp: new Date(),
      note: isAdmin ? 'Cancelled by admin' : 'Cancelled by customer'
    });
    
    await order.save();
    
    return NextResponse.json(
      { 
        message: 'Order cancelled successfully',
        order
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Cancel order error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while cancelling the order' },
      { status: 500 }
    );
  }
}