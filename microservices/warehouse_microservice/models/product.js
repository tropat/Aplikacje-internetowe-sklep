const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  timestamps: false,
});


module.exports = Product;