const express = require('express');
const getProductById = require('../controllers/productController');

const router = express.Router();

router.get('/:id', getProductById);

module.exports = router;
