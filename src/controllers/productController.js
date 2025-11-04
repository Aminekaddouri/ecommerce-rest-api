const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({
    success: true,
    data: product,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Make sure user owns the product (optional check)
  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized to update this product');
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return updated document
    runValidators: true, // Run model validators on update
  });

  res.json({
    success: true,
    data: product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Make sure user owns the product
  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized to delete this product');
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: 'Product removed successfully',
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
