import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: mongoose.Schema.Types.ObjectId },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
});

const paymentInfoSchema = new mongoose.Schema({
  method: { type: String, enum: ['credit_card', 'paypal', 'stripe', 'cash_on_delivery'], required: true },
  transactionId: String,
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  paymentDate: Date,
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    guestEmail: String, // For guest checkout
    orderNumber: { type: String, required: true, unique: true },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    billingAddress: shippingAddressSchema,
    paymentInfo: paymentInfoSchema,
    shippingMethod: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      estimatedDelivery: String,
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    couponCode: String,
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending',
    },
    notes: String,
    trackingNumber: String,
    carrier: String,
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,
    statusHistory: [
      {
        status: String,
        date: { type: Date, default: Date.now },
        note: String,
      },
    ],
    invoiceUrl: String,
    taxDetails: {
      taxRate: Number,
      taxableAmount: Number,
    },
  },
  { timestamps: true }
);

// Generate order number before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    // Generate a unique order number (e.g., CH-YYYYMMDD-XXXX)
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');
    
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    this.orderNumber = `CH-${dateStr}-${randomPart}`;
    
    // Add initial status to history
    if (this.statusHistory.length === 0) {
      this.statusHistory.push({
        status: this.status,
        date: new Date(),
        note: 'Order created'
      });
    }
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;