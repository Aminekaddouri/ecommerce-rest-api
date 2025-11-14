const mongoose = require('mongoose');

/**
 * Cart Item Schema
 * Each item in the cart
 */
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

/**
 * Cart Schema
 * One cart per user
 */
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // One cart per user
    },
    items: [cartItemSchema],
    totalQuantity: {
      type: Number,
      default: 0,
    },
    subtotal: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Updates totalQuantity and subtotal
cartSchema.methods.calculateTotals = function () {
  this.totalQuantity = this.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  this.subtotal = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

// Pre-save Middleware
// Calculate totals before saving
cartSchema.pre('save', function (next) {
  this.calculateTotals();
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
