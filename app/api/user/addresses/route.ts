import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

// Get all addresses for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
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

    return NextResponse.json(
      { addresses: user.addresses || [] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get addresses error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching addresses' },
      { status: 500 }
    );
  }
}

// Add a new address
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const addressData = await request.json();

    // Validate address data
    const requiredFields = ['street', 'city', 'state', 'zipCode', 'country'];
    for (const field of requiredFields) {
      if (!addressData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // If this is the first address or isDefault is true, make it the default
    if (!user.addresses || user.addresses.length === 0 || addressData.isDefault) {
      // If this address is being set as default, unset any existing default
      if (user.addresses && user.addresses.length > 0) {
        user.addresses.forEach((addr: any) => {
          addr.isDefault = false;
        });
      }
      addressData.isDefault = true;
    }

    // Add the new address
    user.addresses.push(addressData);
    await user.save();

    return NextResponse.json(
      { 
        message: 'Address added successfully',
        address: user.addresses[user.addresses.length - 1] 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Add address error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while adding the address' },
      { status: 500 }
    );
  }
}