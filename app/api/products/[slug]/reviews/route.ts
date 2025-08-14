import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Product from '@/app/models/Product';
import { getServerSession } from 'next-auth/next';

// Get all reviews for a product
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Sorting
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    
    await connectDB();
    
    const product = await Product.findOne({ slug, status: 'published' })
      .select('reviews');
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Sort and paginate reviews
    const sortedReviews = product.reviews
      .sort((a: any, b: any) => {
        if (sort === 'helpfulVotes') {
          return order === 'asc' ? a.helpfulVotes - b.helpfulVotes : b.helpfulVotes - a.helpfulVotes;
        } else if (sort === 'rating') {
          return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        } else { // createdAt
          return order === 'asc' ? 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
    
    const paginatedReviews = sortedReviews.slice(skip, skip + limit);
    
    return NextResponse.json({
      reviews: paginatedReviews,
      pagination: {
        total: product.reviews.length,
        page,
        limit,
        pages: Math.ceil(product.reviews.length / limit)
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching reviews' },
      { status: 500 }
    );
  }
}

// Add a new review
export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession();
    
    // Check authentication
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to leave a review' },
        { status: 401 }
      );
    }
    
    const slug = params.slug;
    const reviewData = await request.json();
    
    // Validate required fields
    const requiredFields = ['rating', 'title', 'comment'];
    for (const field of requiredFields) {
      if (!reviewData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Validate rating
    const rating = parseInt(reviewData.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const product = await Product.findOne({ slug, status: 'published' });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if user has already reviewed this product
    const existingReview = product.reviews.find(
      (review: any) => review.user.toString() === session.user.id
    );
    
    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 409 }
      );
    }
    
    // Create new review
    const newReview = {
      user: session.user.id,
      rating,
      title: reviewData.title,
      comment: reviewData.comment,
      images: reviewData.images || [],
    };
    
    product.reviews.push(newReview);
    await product.save();
    
    return NextResponse.json(
      { 
        message: 'Review added successfully',
        review: product.reviews[product.reviews.length - 1] 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Add review error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while adding the review' },
      { status: 500 }
    );
  }
}