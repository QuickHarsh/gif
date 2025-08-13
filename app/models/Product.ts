import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    images: [String],
    isVerified: { type: Boolean, default: false },
    helpfulVotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  size: String,
  color: String,
  weight: String,
  unit: String,
  quantity: { type: Number, required: true },
  images: [String],
  isDefault: { type: Boolean, default: false },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: String,
    brand: String,
    category: { type: String, required: true },
    subcategory: String,
    tags: [String],
    basePrice: { type: Number, required: true },
    salePrice: Number,
    tax: { type: Number, default: 0 },
    taxClass: String,
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    onSale: { type: Boolean, default: false },
    variants: [variantSchema],
    defaultImage: { type: String, required: true },
    images: [String],
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    inventory: {
      sku: String,
      quantity: { type: Number, required: true },
      lowStockThreshold: { type: Number, default: 5 },
      reservedQuantity: { type: Number, default: 0 },
      allowBackorders: { type: Boolean, default: false },
      manageInventory: { type: Boolean, default: true },
    },
    relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    specifications: { type: Map, of: String },
    shippingClass: String,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: { type: String, default: 'cm' },
    },
    weight: {
      value: Number,
      unit: { type: String, default: 'kg' },
    },
    metaTitle: String,
    metaDescription: String,
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  },
  { timestamps: true }
);

// Calculate average rating when reviews are modified
productSchema.pre('save', function (next) {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
    this.numReviews = this.reviews.length;
  } else {
    this.averageRating = 0;
    this.numReviews = 0;
  }
  next();
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;