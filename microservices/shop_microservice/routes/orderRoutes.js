const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');

const {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

router.get('/', authenticateToken, getAllOrders);
router.get('/:id', authenticateToken, getOrderById);
router.get('/user/:user_id', authenticateToken, getOrdersByUserId);
router.post('/', authenticateToken, createOrder);
router.put('/:id', authenticateToken, updateOrderStatus);
router.delete('/:id', authenticateToken, deleteOrder); // Temporary

module.exports = router;
