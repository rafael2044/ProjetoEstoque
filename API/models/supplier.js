const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');

const Supplier = sequelize.define('Supplier', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
});

module.exports = Supplier;
