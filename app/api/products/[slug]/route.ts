import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Product from '@/app/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import User from '@/app/models/User';

// Get a single product by slug
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const session = await getServerSession(authOptions);
    
    await connectDB();
    
    const product = await Product.findOne({ slug, status: 'published' });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // If user is logged in, add to recently viewed
    if (session?.user?.id) {
      await User.findByIdAndUpdate(
        session.user.id,
        { 
          $pull: { recentlyViewed: product._id }, // Remove if already exists
        },
        { new: true }
      );
      
      await User.findByIdAndUpdate(
        session.user.id,
        { 
          $push: { recentlyViewed: { $each: [product._id], $position: 0, $slice: 10 } }, // Add to front, limit to 10
        },
        { new: true }
      );
    }
    
    // Get related products
    let relatedProducts = [];
    if (product.relatedProducts && product.relatedProducts.length > 0) {
      relatedProducts = await Product.find({
        _id: { $in: product.relatedProducts },
        status: 'published'
      }).select('name slug basePrice salePrice defaultImage averageRating numReviews');
    } else {
      // If no related products defined, get products from same category
      relatedProducts = await Product.find({
        category: product.category,
        _id: { $ne: product._id },
        status: 'published'
      })
      .select('name slug basePrice salePrice defaultImage averageRating numReviews')
      .limit(4);
    }
    
    return NextResponse.json(
      { 
        product,
        relatedProducts
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching the product' },
      { status: 500 }
    );
  }
}

// Update a product (admin only)
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication and authorization
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const slug = params.slug;
    const productData = await request.json();
    
    await connectDB();
    
    const product = await Product.findOne({ slug });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // If slug is being changed, check if new slug is unique
    if (productData.slug && productData.slug !== slug) {
      const existingProduct = await Product.findOne({ slug: productData.slug });
      if (existingProduct) {
        return NextResponse.json(
          { error: 'A product with this slug already exists' },
          { status: 409 }
        );
      }
    }
    
    // Update product fields
    Object.keys(productData).forEach((key) => {
      if (key !== '_id' && key !== 'reviews') {
        product[key] = productData[key];
      }
    });
    
    await product.save();
    
    return NextResponse.json(
      { 
        message: 'Product updated successfully',
        product 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while updating the product' },
      { status: 500 }
    );
  }
}

// Delete a product (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication and authorization
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const slug = params.slug;
    
    await connectDB();
    
    const product = await Product.findOne({ slug });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Instead of deleting, mark as archived
    product.status = 'archived';
    await product.save();
    
    return NextResponse.json(
      { message: 'Product archived successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while archiving the product' },
      { status: 500 }
    );
  }
}