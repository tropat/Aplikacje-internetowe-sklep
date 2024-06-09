const { Product } = require('../models');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: `Product with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to retrieve product with ID ${id}` });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
