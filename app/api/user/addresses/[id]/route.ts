import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

// Get a specific address
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const addressId = params.id;

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { address },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get address error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching the address' },
      { status: 500 }
    );
  }
}

// Update an address
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const addressId = params.id;
    const addressData = await request.json();

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    // If setting this address as default, unset any existing default
    if (addressData.isDefault) {
      user.addresses.forEach((addr: any) => {
        if (addr._id.toString() !== addressId) {
          addr.isDefault = false;
        }
      });
    }

    // Update address fields
    Object.keys(addressData).forEach((key) => {
      if (key !== '_id') {
        address[key] = addressData[key];
      }
    });

    await user.save();

    return NextResponse.json(
      { 
        message: 'Address updated successfully',
        address 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update address error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while updating the address' },
      { status: 500 }
    );
  }
}

// Delete an address
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const addressId = params.id;

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    const wasDefault = address.isDefault;

    // Remove the address
    address.remove();

    // If the removed address was the default and there are other addresses,
    // make the first one the new default
    if (wasDefault && user.addresses.length > 0) {
      user.addresses[0].isDefault = true;
    }

    await user.save();

    return NextResponse.json(
      { message: 'Address deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete address error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while deleting the address' },
      { status: 500 }
    );
  }
}