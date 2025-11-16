const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');
const {
  orderConfirmationEmail,
  orderStatusUpdateEmail,
} = require('../utils/emailTemplates');

// Create new order from cart
const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  // Validate shipping address
  if (!shippingAddress) {
    res.status(400);
    throw new Error('Please provide shipping address');
  }

  // Get user's cart
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'items.product'
  );

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  // Verify stock availability and build order items
  const orderItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    if (!product) {
      res.status(404);
      throw new Error(`Product ${item.product.name} not found`);
    }

    // Check stock
    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(
        `Insufficient stock for ${product.name}. Only ${product.stock} available.`
      );
    }

    // Create order item (snapshot)
    orderItems.push({
      product: product._id,
      name: product.name,
      quantity: item.quantity,
      price: item.price, // Use cart price (agreed price)
      image: product.images[0]?.url || 'https://via.placeholder.com/150',
    });

    // Reduce stock
    product.stock -= item.quantity;
    await product.save();
  }

  // Calculate prices
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const taxPrice = Number((itemsPrice * 0.1).toFixed(2)); // 10% tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

  // Create order
  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'Cash on Delivery',
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  // Clear cart after order
  cart.items = [];
  await cart.save();

  // Populate user info
  await order.populate('user', 'name email');

  // Send order confirmation email
  try {
    await sendEmail({
      email: order.user.email,
      subject: `Order Confirmation - #${order._id.toString().slice(-8).toUpperCase()}`,
      html: orderConfirmationEmail(order, order.user),
    });
    console.log('✅ Order confirmation email sent');
  } catch (error) {
    console.error('❌ Order confirmation email failed:', error.message);
  }

  res.status(201).json({
    success: true,
    data: order,
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');

  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check authorization: Owner or Admin can view
  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(401);
    throw new Error('Not authorized to view this order');
  }

  res.json({
    success: true,
    data: order,
  });
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check authorization: Owner or Admin
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(401);
    throw new Error('Not authorized to update this order');
  }

  // Update payment info
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };
  order.orderStatus = 'Processing'; // Move to processing after payment

  const updatedOrder = await order.save();

  res.json({
    success: true,
    data: updatedOrder,
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Validate status
  const validStatuses = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];
  if (!validStatuses.includes(orderStatus)) {
    res.status(400);
    throw new Error('Invalid order status');
  }

  // Update status
  order.orderStatus = orderStatus;

  // If delivered, update delivery info
  if (orderStatus === 'Delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  const updatedOrder = await order.save();

  // Populate user info for email
  await updatedOrder.populate('user', 'name email');

  // Send status update email
  try {
    await sendEmail({
      email: updatedOrder.user.email,
      subject: `Order Status Update - #${updatedOrder._id.toString().slice(-8).toUpperCase()}`,
      html: orderStatusUpdateEmail(updatedOrder, updatedOrder.user),
    });
    console.log('✅ Order status update email sent');
  } catch (error) {
    console.error('❌ Order status email failed:', error.message);
    // Don't throw error - status is updated
  }

  res.json({
    success: true,
    data: updatedOrder,
  });
});

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check authorization: Owner or Admin
  if (
    order.user.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    res.status(401);
    throw new Error('Not authorized to cancel this order');
  }

  // Can't cancel if already shipped or delivered
  if (order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') {
    res.status(400);
    throw new Error(
      `Cannot cancel order that is ${order.orderStatus.toLowerCase()}`
    );
  }

  // Restore stock
  for (const item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }

  // Update order status
  order.orderStatus = 'Cancelled';

  const cancelledOrder = await order.save();

  res.json({
    success: true,
    message: 'Order cancelled successfully',
    data: cancelledOrder,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'name email')
    .sort('-createdAt');

  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
};
