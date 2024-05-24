const sequelize = require('../config/database');
const Product = require('./product');
const Order = require('./order');

const initDb = async () => {
  await sequelize.sync();
};

module.exports = { initDb, Product, Order };
