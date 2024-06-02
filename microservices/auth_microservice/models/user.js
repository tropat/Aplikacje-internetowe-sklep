const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'client',
    validate: {
      isIn: [['client', 'deliverer']],
    },
  },
}, {
  timestamps: false,
});

module.exports = User;
