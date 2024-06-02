const express = require('express');
const {
    getAllProducts,
    getProductById
  } = require('../controllers/productController');

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);
router.get('/:id', authenticateToken, getProductById);

module.exports = router;
