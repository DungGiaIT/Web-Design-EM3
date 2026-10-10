const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.FLOAT,
  image: DataTypes.STRING,
  description: DataTypes.TEXT
}, {
  tableName: 'table_products',
  timestamps: false
});

module.exports = Product;