const express = require('express');
const {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/user/:user_id', getOrdersByUserId);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.delete('/:id', deleteOrder); // Temporary

module.exports = router;
