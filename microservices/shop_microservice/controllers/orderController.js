const { Product, Order } = require('../models');
const jwt = require('jsonwebtoken');

const _calculateTotalAmount = async (products) => {
  let totalAmount = 0;
  for (const productId of products) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    totalAmount += product.price;
  }
  totalAmount = Number(totalAmount.toFixed(2));

  return totalAmount;
};

const _createOrderResponse = async (order) => {
  const productIds = order.products;
  const products = await Promise.all(productIds.map(productId => Product.findByPk(productId)));

  if (products.includes(null)) {
    throw new Error('One or more products not found');
  }

  const mappedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
  }));

  const orderResponse = {
    id: order.id,
    user_id: order.user_id,
    total_amount: order.total_amount,
    address: order.address,
    datetime: order.datetime,
    order_status: order.order_status,
    products: mappedProducts
  };

  return orderResponse;
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    const orderResponses = await Promise.all(orders.map(order => _createOrderResponse(order)));
    res.json(orderResponses);
  } catch (error) {
    console.log('Error getAllOrders: ', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: `Order with ID ${id} not found` });
    }
    const orderResponse = await _createOrderResponse(order);
    res.json(orderResponse);
  } catch (error) {
    console.log('Error getOrderById: ', error);
    res.status(500).json({ error: `Failed to retrieve order with ID ${id}` });
  }
};

const getOrdersByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const orders = await Order.findAll({ where: { user_id: user_id } });
    if (orders.length === 0) {
      return res.status(404).json({ error: `No orders found for user with ID ${user_id}` });
    }
    const orderResponses = await Promise.all(orders.map(order => _createOrderResponse(order)));
    res.json(orderResponses);
  } catch (error) {
    console.log('Error getOrdersByUserId: ', error);
    res.status(500).json({ error: `Failed to retrieve orders for user with ID ${user_id}` });
  }
};

const createOrder = async (req, res) => {
  const { user_id, products, address} = req.body;
  try {
    datetime = new Date();
    const totalAmount = await _calculateTotalAmount(products);

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

    const newOrder = await Order.create({
      user_id: user_id,
      products: products,
      total_amount: totalAmount,
      address: address,
      datetime: datetime,
      order_status: 'AwaitingApproval'
    });
    console.log('newOrder: ', newOrder.id);
    const token = jwt.sign({ service: 'shop' }, process.env.SERVER_ACCESS_TOKEN_SECRET);

    const response = await fetch('http://localhost:3321/packages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ products, address, order_id: newOrder.id})
    });

    if (response.ok) {
      newOrder.order_status = 'pending';
      await newOrder.save();
    }

    res.status(201).json(newOrder);
  } catch (error) {
    console.log('CreateOrder error: ', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: `Order with ID ${id} not found` });
    }

    if (!['pending', 'shipped', 'delivered'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    order.order_status = status;
    await order.save();

    res.json({ message: `Order with ID ${id} status updated to ${status}` });
  } catch (error) {
    console.log('Error updateOrderStatus: ', error);
    res.status(500).json({ error: `Failed to update order status for ID ${id}` });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
};
