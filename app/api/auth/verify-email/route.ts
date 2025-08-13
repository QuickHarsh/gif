import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    // Mark user as verified and remove token
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to login page with success message
    return NextResponse.redirect(new URL('/login?verified=true', request.url));
  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during email verification' },
      { status: 500 }
    );
  }
}