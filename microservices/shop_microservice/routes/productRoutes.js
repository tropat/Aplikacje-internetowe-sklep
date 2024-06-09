const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');

const {
  getAllProducts,
  getProductById,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);
router.get('/:id', authenticateToken, getProductById);

module.exports = router;
