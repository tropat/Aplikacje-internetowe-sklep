const sequelize = require('../config/database');
const Product = require('./product');
const Package = require('./package');

const initDb = async () => {
  await sequelize.sync();
};

module.exports = { initDb, Product, Package };
