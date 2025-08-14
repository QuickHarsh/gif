import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Product from '@/app/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Get all products with filtering, pagination, and sorting
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Filtering
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured');
    const onSale = searchParams.get('onSale');
    const inStock = searchParams.get('inStock');
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;
    
    // Sorting
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    
    // Build query
    const query: any = {};
    
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (minPrice) query.basePrice = { $gte: parseFloat(minPrice) };
    if (maxPrice) {
      if (query.basePrice) {
        query.basePrice.$lte = parseFloat(maxPrice);
      } else {
        query.basePrice = { $lte: parseFloat(maxPrice) };
      }
    }
    if (featured === 'true') query.featured = true;
    if (onSale === 'true') query.onSale = true;
    if (inStock === 'true') query['inventory.quantity'] = { $gt: 0 };
    
    // Only show published products
    query.status = 'published';
    
    await connectDB();
    
    // Get total count for pagination
    const total = await Product.countDocuments(query);
    
    // Get products
    const products = await Product.find(query)
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .select('-reviews'); // Exclude reviews for performance
    
    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching products' },
      { status: 500 }
    );
  }
}

// Create a new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication and authorization
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const productData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'basePrice', 'defaultImage'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Generate slug if not provided
    if (!productData.slug) {
      productData.slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    await connectDB();
    
    // Check if slug is unique
    const existingProduct = await Product.findOne({ slug: productData.slug });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 409 }
      );
    }
    
    // Create new product
    const newProduct = new Product(productData);
    await newProduct.save();
    
    return NextResponse.json(
      { 
        message: 'Product created successfully',
        product: newProduct 
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