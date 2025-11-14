const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);

router.get('/my-orders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);

router.put('/:id/status', protect, admin, updateOrderStatus);

router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
