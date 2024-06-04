const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Orders', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('Products attribute should be an array of Product IDs');
        }
      },
    },
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  order_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'AwaitingApproval',
    validate: {
      isIn: [['AwaitingApproval', 'pending', 'shipped', 'delivered']],
    },
  },
}, {
  timestamps: false,
});

module.exports = Order;
