const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');

const InvalidToken = sequelize.define('InvalidToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    // opções adicionais, se necessário
});

module.exports = InvalidToken;
