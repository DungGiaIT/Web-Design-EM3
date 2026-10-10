const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shop_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log(' Database connected'))
  .catch(err => console.log(' DB error:', err));

module.exports = sequelize;