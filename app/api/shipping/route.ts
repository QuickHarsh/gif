import { NextRequest, NextResponse } from 'next/server';

// Mock shipping method configurations
const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivery in 5-7 business days',
    price: 5.99,
    estimatedDays: 7,
    enabled: true
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivery in 2-3 business days',
    price: 12.99,
    estimatedDays: 3,
    enabled: true
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day delivery',
    price: 24.99,
    estimatedDays: 1,
    enabled: true
  },
  {
    id: 'free',
    name: 'Free Shipping',
    description: 'Free shipping on orders over $100',
    price: 0,
    estimatedDays: 7,
    enabled: true,
    minimumOrderAmount: 100
  }
];

// Get available shipping methods
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderAmount = parseFloat(searchParams.get('orderAmount') || '0');
    const countryCode = searchParams.get('countryCode') || 'US';
    
    // Filter shipping methods based on order amount and country
    let availableShippingMethods = SHIPPING_METHODS.filter(method => {
      // Check if method is enabled
      if (!method.enabled) return false;
      
      // Check minimum order amount if applicable
      if (method.minimumOrderAmount && orderAmount < method.minimumOrderAmount) {
        return false;
      }
      
      return true;
    });
    
    // Apply country-specific logic (mock implementation)
    if (countryCode !== 'US') {
      // Adjust prices for international shipping
      availableShippingMethods = availableShippingMethods.map(method => ({
        ...method,
        price: method.price * 1.5, // 50% more expensive for international
        estimatedDays: method.estimatedDays + 3 // 3 days longer for international
      }));
      
      // Remove overnight shipping for international orders
      availableShippingMethods = availableShippingMethods.filter(
        method => method.id !== 'overnight'
      );
    }
    
    return NextResponse.json(
      { shippingMethods: availableShippingMethods },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Shipping methods error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching shipping methods' },
      { status: 500 }
    );
  }
}

// Calculate shipping cost
export async function POST(request: NextRequest) {
  try {
    const { shippingMethodId, orderAmount, countryCode = 'US', items } = await request.json();
    
    // Validate required fields
    if (!shippingMethodId) {
      return NextResponse.json(
        { error: 'Shipping method ID is required' },
        { status: 400 }
      );
    }
    
    // Find selected shipping method
    let shippingMethod = SHIPPING_METHODS.find(method => method.id === shippingMethodId);
    
    if (!shippingMethod || !shippingMethod.enabled) {
      return NextResponse.json(
        { error: 'Selected shipping method is not available' },
        { status: 400 }
      );
    }
    
    // Check minimum order amount if applicable
    if (shippingMethod.minimumOrderAmount && orderAmount < shippingMethod.minimumOrderAmount) {
      return NextResponse.json(
        { 
          error: `This shipping method requires a minimum order of $${shippingMethod.minimumOrderAmount}` 
        },
        { status: 400 }
      );
    }
    
    // Apply international shipping adjustments
    let shippingCost = shippingMethod.price;
    let estimatedDays = shippingMethod.estimatedDays;
    
    if (countryCode !== 'US') {
      shippingCost *= 1.5; // 50% more expensive for international
      estimatedDays += 3; // 3 days longer for international
    }
    
    // Calculate estimated delivery date
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + estimatedDays);
    
    // Format delivery date
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return NextResponse.json(
      { 
        shippingMethod: {
          id: shippingMethod.id,
          name: shippingMethod.name,
          description: shippingMethod.description,
          price: shippingCost,
          estimatedDays,
          estimatedDeliveryDate: formattedDeliveryDate
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Shipping calculation error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while calculating shipping' },
      { status: 500 }
    );
  }
}