import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Mock payment gateway configurations
const PAYMENT_GATEWAYS = {
  stripe: {
    name: 'Stripe',
    enabled: true,
    icon: '/images/payment/stripe.svg',
    supportedCards: ['visa', 'mastercard', 'amex', 'discover']
  },
  paypal: {
    name: 'PayPal',
    enabled: true,
    icon: '/images/payment/paypal.svg',
    supportedCards: []
  },
  applePay: {
    name: 'Apple Pay',
    enabled: true,
    icon: '/images/payment/apple-pay.svg',
    supportedCards: []
  },
  googlePay: {
    name: 'Google Pay',
    enabled: true,
    icon: '/images/payment/google-pay.svg',
    supportedCards: []
  }
};

// Get available payment methods
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Filter enabled payment gateways
    const availablePaymentMethods = Object.entries(PAYMENT_GATEWAYS)
      .filter(([_, gateway]) => gateway.enabled)
      .map(([id, gateway]) => ({
        id,
        name: gateway.name,
        icon: gateway.icon,
        supportedCards: gateway.supportedCards
      }));
    
    return NextResponse.json(
      { paymentMethods: availablePaymentMethods },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Payment methods error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching payment methods' },
      { status: 500 }
    );
  }
}

// Process payment (mock implementation)
export async function POST(request: NextRequest) {
  try {
    const { paymentMethod, amount, currency = 'USD', orderId } = await request.json();
    
    // Validate required fields
    if (!paymentMethod || !amount || !orderId) {
      return NextResponse.json(
        { error: 'Payment method, amount, and order ID are required' },
        { status: 400 }
      );
    }
    
    // Check if payment method is available
    if (!PAYMENT_GATEWAYS[paymentMethod as keyof typeof PAYMENT_GATEWAYS]?.enabled) {
      return NextResponse.json(
        { error: 'Selected payment method is not available' },
        { status: 400 }
      );
    }
    
    // Mock payment processing
    // In a real implementation, this would integrate with the actual payment gateway API
    const paymentResult = {
      success: true,
      transactionId: `txn_${Date.now()}`,
      paymentMethod,
      amount,
      currency,
      orderId,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(
      { 
        message: 'Payment processed successfully',
        payment: paymentResult
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing payment' },
      { status: 500 }
    );
  }
}