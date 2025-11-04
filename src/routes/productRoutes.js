const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('./../controllers/productController');
const { protect, admin } = require('./../middleware/authMiddleware');

router.route('/').post(protect, admin, createProduct).get(getAllProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .deleteProduct(protect, admin, deleteProduct);

module.exports = router;
