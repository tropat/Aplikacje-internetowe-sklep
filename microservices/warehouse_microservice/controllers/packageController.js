const { Product, Package} = require('../models');
const jwt = require('jsonwebtoken');

const _createPackageResponse = async (package) => {
  const productIds = package.products;
  const products = await Promise.all(productIds.map(productId => Product.findByPk(productId)));

  if (products.includes(null)) {
    throw new Error('One or more products not found');
  }

  const mappedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
  }));

  const packageResponse = {
    id: package.id,
    products: mappedProducts,
    address: package.address,
    deliverer_id: package.deliverer_id,
    delivery_status: package.delivery_status
  };

  return packageResponse;
};

const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.findAll();
    const packageResponses = await Promise.all(packages.map(package => _createPackageResponse(package)));
    res.json(packageResponses);
  } catch (error) {
    console.log('Error getAllPackages: ', error);
    res.status(500).json({ error: 'Failed to retrieve packages' });
  }
};

const getPackageById = async (req, res) => {
  const { id } = req.params;
  try {
    const package = await Package.findByPk(id);
    if (!package) {
      return res.status(404).json({ error: `Package with ID ${id} not found` });
    }
    const packageResponse = await _createPackageResponse(package);
    res.json(packageResponse);
  } catch (error) {
    console.log('Error getPackageById: ', error);
    res.status(500).json({ error: `Failed to retrieve package with ID ${id}` });
  }
};

const getPackagesByDelivererId = async (req, res) => {
  const { deliverer_id } = req.params;
  try {
    const packages = await Package.findAll({ where: { deliverer_id: deliverer_id } });
    if (packages.length === 0) {
      return res.status(404).json({ error: `No orders found for user with ID ${deliverer_id}` });
    }
    const packageResponses = await Promise.all(packages.map(package => _createPackageResponse(package)));
    res.json(packageResponses);
  } catch (error) {
    console.log('Error getPackagesByDelivererId: ', error);
    res.status(500).json({ error: `Failed to retrieve packages for user with ID ${deliverer_id}` });
  }
};

const createPackage = async (req, res) => {
  const { products, address, order_id} = req.body;
  try {
    for (const productId of products) {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      if (product.quantity > 0) {
        product.quantity -= 1;
        await product.save();
      } else {
        throw new Error(`Product with ID ${productId} is out of stock`);
      }
    }

    const newPackage = await Package.create({
      products: products,
      address: address,
      order_status: 'pending',
      order_id: order_id
    });
    res.status(201).json(newPackage);
  } catch (error) {
    console.log('Error createPackage: ', error);
    res.status(500).json({ error: 'Failed to create package' });
  }
};

const updatePackageStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const package = await Package.findByPk(id);
    if (!package) {
      return res.status(404).json({ error: `Package with ID ${id} not found` });
    }

    if (!['pending', 'shipped', 'delivered'].includes(status)) {
      console.log('Invalid status provided');
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    package.delivery_status = status;
    await package.save();

    try {
      const token = jwt.sign({ service: 'warehouse' }, process.env.SERVER_ACCESS_TOKEN_SECRET);

      const response = await fetch(`http://localhost:3320/orders/${package.order_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        console.log('Order status updated');
      } else {
        console.log('Failed to update order status');
      }
    } catch (error) {
      console.log('Error updating order status: ', error);
    }

    res.json(package);
  } catch (error) {
    console.log('Error updatePackageStatus: ', error);
    res.status(500).json({ error: `Failed to update package status for ID ${id}` });
  }
};

const updatePackageDeliverer = async (req, res) => {
  const { id } = req.params;
  const { deliverer_id } = req.body;

  try {
    const package = await Package.findByPk(id);
    if (!package) {
      return res.status(404).json({ error: `Package with ID ${id} not found` });
    }

    package.deliverer_id = deliverer_id;
    await package.save();

    res.json(package);
  } catch (error) {
    console.log('Error updatePackageDeliverer: ', error);
    res.status(500).json({ error: `Failed to update package deliverer for ID ${id}` });
  }
};

const deletePackageById = async (req, res) => {
  const { id } = req.params;
  try {
    const package = await Package.findByPk(id);
    if (package) {
      await package.destroy();
      res.json({ message: `Package with ID ${id} deleted` });
    } else {
      return res.status(404).json({ error: `Package with ID ${id} not found` });
    }
  } catch (error) {
    console.log('Error deletePackageById: ', error);
    res.status(500).json({ error: `Failed to delete package with ID ${id}` });
  }
};

module.exports = {
  getAllPackages,
  getPackageById,
  getPackagesByDelivererId,
  createPackage,
  updatePackageStatus,
  updatePackageDeliverer,
  deletePackageById
};
