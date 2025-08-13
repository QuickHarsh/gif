import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: mongoose.Schema.Types.ObjectId },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  saveForLater: { type: Boolean, default: false },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String }, // For guest users
    items: [cartItemSchema],
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // 30 days
  },
  { timestamps: true }
);

// Calculate totals before saving
cartSchema.pre('save', function (next) {
  if (this.items && this.items.length > 0) {
    // Calculate subtotal
    this.subtotal = this.items.reduce((sum, item) => {
      if (!item.saveForLater) {
        return sum + (item.price * item.quantity);
      }
      return sum;
    }, 0);
    
    // Apply discount if coupon exists (handled elsewhere)
    
    // Calculate tax (simplified - in real app would use tax service)
    this.tax = this.subtotal * 0.1; // 10% tax example
    
    // Calculate total
    this.total = this.subtotal + this.tax + this.shipping - this.discount;
  } else {
    this.subtotal = 0;
    this.tax = 0;
    this.total = 0;
  }
  next();
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;