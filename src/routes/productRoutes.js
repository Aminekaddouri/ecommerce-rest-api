const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const multerErrorHandler = require('../middleware/multerErrorHandler');

router
  .route('/')
  .get(getAllProducts)
  .post(
    protect,
    admin,
    upload.array('images', 5),
    multerErrorHandler,
    createProduct
  );

router
  .route('/:id')
  .get(getProductById)
  .put(
    protect,
    admin,
    upload.array('images', 5),
    multerErrorHandler,
    updateProduct
  )
  .delete(protect, admin, deleteProduct);

module.exports = router;
