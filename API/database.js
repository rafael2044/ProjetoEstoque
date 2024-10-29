const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './API/database.db', // caminho do banco de dados SQLite
});

module.exports = sequelize;
