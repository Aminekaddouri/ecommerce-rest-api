const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Product = require('../models/Product');

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user._id,
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }

  const review = await Review.create({
    rating,
    comment,
    user: req.user._id,
    product: productId,
  });

  await review.populate('user', 'name avatar');

  res.status(201).json({
    success: true,
    data: review,
  });
});

const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const reviews = await Review.find({ product: productId })
    .populate('user', 'name avatar')
    .sort('-createdAt'); // Newest first

  res.json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

const getReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate('user', 'name avatar')
    .populate('product', 'name price');

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  res.json({
    success: true,
    data: review,
  });
});

const updateReview = asyncHandler(async (req, res) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Make sure user owns the review
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this review');
  }

  review = await Review.findByIdAndUpdate(
    req.params.id,
    {
      rating: req.body.rating || review.rating,
      comment: req.body.comment || review.comment,
    },
    {
      new: true,
      runValidators: true,
    }
  ).populate('user', 'name avatar');

  // Recalculate average rating (triggers post-save hook)
  await review.save();

  res.json({
    success: true,
    data: review,
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Check authorization: Owner or Admin can delete
  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(401);
    throw new Error('Not authorized to delete this review');
  }

  await review.deleteOne();

  res.json({
    success: true,
    message: 'Review removed successfully',
  });
});

const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ user: req.user._id })
    .populate('product', 'name price images')
    .sort('-createdAt');

  res.json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

module.exports = {
  createReview,
  getProductReviews,
  getReview,
  updateReview,
  deleteReview,
  getMyReviews,
};
