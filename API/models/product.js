const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    // opções adicionais, se necessário
});

module.exports = Product;
