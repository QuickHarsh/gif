import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Product from '@/app/models/Product';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse search parameters
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sort = searchParams.get('sort') || 'relevance';
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const colors = searchParams.getAll('color');
    const sizes = searchParams.getAll('size');
    const brands = searchParams.getAll('brand');
    const inStock = searchParams.get('inStock') === 'true';
    
    await connectDB();
    
    // Build search filter
    const filter: any = { status: 'published' };
    
    // Text search
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'seo.keywords': { $regex: query, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category) {
      filter.category = category;
    }
    
    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }
    
    // Color filter
    if (colors.length > 0) {
      filter.$or = filter.$or || [];
      filter.$or.push(
        { 'variants.color': { $in: colors } },
        { color: { $in: colors } }
      );
    }
    
    // Size filter
    if (sizes.length > 0) {
      filter.$or = filter.$or || [];
      filter.$or.push(
        { 'variants.size': { $in: sizes } },
        { size: { $in: sizes } }
      );
    }
    
    // Brand filter
    if (brands.length > 0) {
      filter.brand = { $in: brands };
    }
    
    // In stock filter
    if (inStock) {
      filter.$or = filter.$or || [];
      filter.$or.push(
        { 'inventory.quantity': { $gt: 0 } },
        { 'variants.quantity': { $gt: 0 } }
      );
    }
    
    // Determine sort order
    let sortOptions: any = {};
    switch (sort) {
      case 'price_asc':
        sortOptions.price = 1;
        break;
      case 'price_desc':
        sortOptions.price = -1;
        break;
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'rating':
        sortOptions.averageRating = -1;
        break;
      case 'relevance':
      default:
        // For relevance, if there's a query, we'll use text score
        if (query) {
          sortOptions.score = { $meta: 'textScore' };
        } else {
          sortOptions.createdAt = -1; // Default to newest if no query
        }
        break;
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('name slug price defaultImage inventory.quantity variants averageRating reviewCount');
    
    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    // Calculate available filters for refinement
    // This would typically be done with aggregation, but simplified here
    const availableFilters = await getAvailableFilters(filter);
    
    return NextResponse.json(
      { 
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        filters: availableFilters
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while searching products' },
      { status: 500 }
    );
  }
}

// Helper function to get available filters
async function getAvailableFilters(baseFilter: any) {
  // Get unique categories
  const categories = await Product.distinct('category', { ...baseFilter });
  
  // Get price range
  const priceRange = await Product.aggregate([
    { $match: { ...baseFilter } },
    { 
      $group: { 
        _id: null, 
        min: { $min: '$price' }, 
        max: { $max: '$price' } 
      } 
    }
  ]);
  
  // Get unique colors
  const productColors = await Product.distinct('color', { ...baseFilter });
  const variantColors = await Product.distinct('variants.color', { ...baseFilter });
  const colors = [...new Set([...productColors, ...variantColors])];
  
  // Get unique sizes
  const productSizes = await Product.distinct('size', { ...baseFilter });
  const variantSizes = await Product.distinct('variants.size', { ...baseFilter });
  const sizes = [...new Set([...productSizes, ...variantSizes])];
  
  // Get unique brands
  const brands = await Product.distinct('brand', { ...baseFilter });
  
  return {
    categories,
    priceRange: priceRange.length > 0 ? { min: priceRange[0].min, max: priceRange[0].max } : { min: 0, max: 1000 },
    colors,
    sizes,
    brands
  };
}