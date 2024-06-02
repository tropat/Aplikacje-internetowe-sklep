const sequelize = require('../config/database');
const User = require('./user');

const initDb = async () => {
  await sequelize.sync();
};

module.exports = { initDb, User };
