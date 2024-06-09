const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Package = sequelize.define('Packages', {
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
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliverer_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  delivery_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'shipped', 'delivered']],
    },
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false,
});

module.exports = Package;
