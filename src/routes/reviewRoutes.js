const express = require('express');
const router = express.Router();
const {
  getReview,
  updateReview,
  deleteReview,
  getMyReviews,
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/my-reviews', protect, getMyReviews);

router
  .route('/:id')
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
