const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');
const Product = require('./product');
const User = require('./user');
const Supplier = require('./supplier');

const StockMoviment = sequelize.define('StockMoviment', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('entrada', 'saida'),
        allowNull: false,
    },
});

// Definindo as associações
StockMoviment.belongsTo(Product, { foreignKey: 'productId' });
StockMoviment.belongsTo(User, { foreignKey: 'userId', allowNull: true });
StockMoviment.belongsTo(Supplier, { foreignKey: 'supplierId', allowNull: true });

module.exports = StockMoviment;
