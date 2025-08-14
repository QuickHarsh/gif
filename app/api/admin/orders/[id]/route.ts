import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { sendOrderStatusUpdateEmail } from '@/lib/email';

// Get specific order details (admin only)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const orderId = params.id;
    
    await connectDB();
    
    // Find order with detailed information
    const order = await Order.findById(orderId)
      .populate({
        path: 'user',
        select: 'name email'
      })
      .populate({
        path: 'items.product',
        select: 'name slug defaultImage inventory'
      });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { order },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin get order details error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching order details' },
      { status: 500 }
    );
  }
}

// Update order (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const orderId = params.id;
    const { 
      status, 
      trackingNumber, 
      trackingUrl,
      estimatedDeliveryDate,
      note
    } = await request.json();
    
    await connectDB();
    
    // Find order
    const order = await Order.findById(orderId).populate({
      path: 'user',
      select: 'email'
    });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update order fields
    if (status && order.status !== status) {
      order.status = status;
      order.statusHistory.push({
        status,
        timestamp: new Date(),
        note: note || `Status updated to ${status} by admin`
      });
    }
    
    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }
    
    if (trackingUrl) {
      order.trackingUrl = trackingUrl;
    }
    
    if (estimatedDeliveryDate) {
      order.estimatedDeliveryDate = new Date(estimatedDeliveryDate);
    }
    
    await order.save();
    
    // Send email notification for status update
    try {
      const emailTo = order.user?.email || order.guestEmail;
      if (emailTo && status && order.status !== status) {
        await sendOrderStatusUpdateEmail(emailTo, order);
      }
    } catch (emailError) {
      console.error('Failed to send order status update email:', emailError);
      // Continue with order update even if email fails
    }
    
    return NextResponse.json(
      { 
        message: 'Order updated successfully',
        order
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin update order error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while updating the order' },
      { status: 500 }
    );
  }
}