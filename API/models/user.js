const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    access_level: {
        type: DataTypes.ENUM('administrador', 'padrao'),
        allowNull: false,
    },
});

module.exports = User;
