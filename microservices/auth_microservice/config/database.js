const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './authDb.sqlite',
  define: {
    timestamps: false,
  }
});

module.exports = sequelize;
