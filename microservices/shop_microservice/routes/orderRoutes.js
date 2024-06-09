const express = require('express');
const { authenticateToken, authorizeServer } = require('../middlewares/authMiddleware');

const {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

router.get('/', authenticateToken, getAllOrders);
router.get('/:id', authenticateToken, getOrderById);
router.get('/user/:user_id', authenticateToken, getOrdersByUserId);
router.post('/', authenticateToken, createOrder);
router.put('/:id', authorizeServer, updateOrderStatus);

module.exports = router;
