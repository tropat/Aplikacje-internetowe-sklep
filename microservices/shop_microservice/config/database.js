const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './shopDb.sqlite',
  define: {
    timestamps: false,
  }
});

module.exports = sequelize;
