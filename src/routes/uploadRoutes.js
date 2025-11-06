const express = require('express');
const router = express.Router();
const {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
} = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const multerErrorHandler = require('../middleware/multerErrorHandler');

router.post(
  '/single',
  protect,
  admin,
  upload.single('image'),
  multerErrorHandler,
  uploadSingleImage
);

router.post(
  '/multiple',
  protect,
  admin,
  upload.array('images', 5),
  multerErrorHandler,
  uploadMultipleImages
);

router.delete('/:public_id', protect, admin, deleteImage);

module.exports = router;
