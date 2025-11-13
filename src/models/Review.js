const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Please add a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      required: [true, 'Please add a comment'],
      maxLength: [500, 'Comment cannot exceed 500 characters'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Index
// Ensures one user can only review a product once
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Static Method: Calculate Average Rating
// Called after review is saved/deleted to update product
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        numberOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    if (stats.length > 0) {
      await this.model('Product').findByIdAndUpdate(productId, {
        ratings: Math.round(stats[0].averageRating * 10) / 10, // Round to 1 decimal
        numOfReviews: stats[0].numberOfReviews,
      });
    } else {
      // No reviews, reset to 0
      await this.model('Product').findByIdAndUpdate(productId, {
        ratings: 0,
        numOfReviews: 0,
      });
    }
  } catch (error) {
    console.error('Error calculating average rating:', error);
  }
};

// Post-save Middleware
// Calculate average rating after review is saved
reviewSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.product);
});

// Post-remove Middleware
// Recalculate average raing after review is deleted
reviewSchema.post('deleteOne', { document: true }, function () {
  this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);
