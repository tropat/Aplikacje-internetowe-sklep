const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './warehouseDB.sqlite',
  define: {
    timestamps: false,
  }
});

module.exports = sequelize;
