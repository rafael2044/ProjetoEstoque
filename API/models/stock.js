const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Product = require('./product');

const Stock = sequelize.define('stock', {
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

// Definindo a associação
Stock.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Stock;
