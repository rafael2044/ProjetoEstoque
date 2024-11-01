const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');
const User = require("./user")

const RefreshToken = sequelize.define('RefreshToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresIn: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

RefreshToken.belongsTo(User, {foreignKey: 'userId'})
module.exports = RefreshToken;
