const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    res.status(400);
    throw new Error('Please provide product ID and quantity');
  }

  if (quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    res.status(400);
    throw new Error(
      `Only ${product.stock} items available. Cannot add ${quantity} to cart.`
    );
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  // Check if product already in cart
  const existingItemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Product already in cart - update quantity
    const newQuantity = cart.items[existingItemIndex].quantity + quantity;

    // Check stock for new quantity
    if (product.stock < newQuantity) {
      res.status(400);
      throw new Error(
        `Only ${product.stock} items available. You have ${cart.items[existingItemIndex].quantity} in cart.`
      );
    }

    cart.items[existingItemIndex].quantity = newQuantity;
  } else {
    // Add new item to cart
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  // Save cart (triggers pre-save hook to calculate totals)
  await cart.save();

  // Populate product details
  await cart.populate('items.product', 'name price images stock');

  res.status(200).json({
    success: true,
    data: cart,
  });
});

const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    'items.product',
    'name price images stock'
  );

  // If no cart exists, return empty cart
  if (!cart) {
    cart = {
      items: [],
      totalQuantity: 0,
      subtotal: 0,
    };
  }

  res.json({
    success: true,
    data: cart,
  });
});

// Update cart item quantity
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  if (!quantity || quantity < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Find item in cart
  const itemIndex = cart.items.findIndex(
    item => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  // Check product stock
  const product = await Product.findById(cart.items[itemIndex].product);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    res.status(400);
    throw new Error(
      `Only ${product.stock} items available. Cannot update to ${quantity}.`
    );
  }

  // Update quantity
  cart.items[itemIndex].quantity = quantity;

  await cart.save();

  await cart.populate('items.product', 'name price images stock');

  res.json({
    success: true,
    data: cart,
  });
});

const removeFromCart = asyncHandler(async (req, res) => {
  const itemId = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Find item in cart
  const itemIndex = cart.items.findIndex(
    item => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  // Save cart
  await cart.save();

  // Populate product details
  await cart.populate('items.product', 'name price images stock');

  res.json({
    success: true,
    message: 'Item removed from cart',
    data: cart,
  });
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  // Clear all items
  cart.items = [];

  // Save cart (totals will be recalculated to 0)
  await cart.save();

  res.json({
    success: true,
    message: 'Cart cleared',
    data: cart,
  });
});

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
