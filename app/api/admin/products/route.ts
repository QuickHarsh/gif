import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

// Get all products (admin view with additional details)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
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
    
    // Include all products, even archived ones for admin
    if (status) {
      filter.status = status;
    }
    
    // Search by name, description, or SKU
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Build sort options
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Get products with inventory and variant details
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    // Get inventory stats
    const lowStockCount = await Product.countDocuments({
      $or: [
        { 'inventory.quantity': { $lte: 10 } },
        { 'variants.quantity': { $lte: 10 } }
      ]
    });
    
    const outOfStockCount = await Product.countDocuments({
      $or: [
        { 'inventory.quantity': 0 },
        { 'variants.quantity': 0 }
      ]
    });
    
    return NextResponse.json(
      { 
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        stats: {
          lowStock: lowStockCount,
          outOfStock: outOfStockCount,
          total
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Admin get products error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching products' },
      { status: 500 }
    );
  }
}

// Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Generate slug if not provided
    if (!productData.slug) {
      productData.slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    // Check if slug is unique
    const existingProduct = await Product.findOne({ slug: productData.slug });
    if (existingProduct) {
      // Append timestamp to make slug unique
      productData.slug = `${productData.slug}-${Date.now()}`;
    }
    
    // Set default values
    if (!productData.status) {
      productData.status = 'draft'; // Default to draft
    }
    
    if (!productData.inventory) {
      productData.inventory = {
        quantity: 0,
        lowStockThreshold: 10,
        allowBackorders: false
      };
    }
    
    // Create product
    const product = new Product(productData);
    await product.save();
    
    return NextResponse.json(
      { 
        message: 'Product created successfully',
        product
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while creating the product' },
      { status: 500 }
    );
  }
}