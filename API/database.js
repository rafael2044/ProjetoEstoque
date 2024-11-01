const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db', // caminho do banco de dados SQLite
});


module.exports = {sequelize};
