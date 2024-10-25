const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');

const syncDatabase = async () => {
    try {
        const User = require('./models/user');
        const Supplier = require('./models/supplier');
        const Product = require('./models/product');
        const Stock = require('./models/stock');
        const StockMoviment = require('./models/stock_movement');
        await sequelize.sync({ force: true }); // Cuidado: isso irá apagar os dados existentes
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
};

syncDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Importando as rotas
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user');
const supplierRouter = require('./routes/supplier');
const productRouter = require('./routes/product');
const stockRouter = require('./routes/stock');
const stockMovimentRouter = require('./routes/stock_movement');

// Usando as rotas
app.use('/api/', authRouter)
app.use('/api/user', userRouter);
app.use('/api/supplier', supplierRouter);
app.use('/api/product', productRouter);
app.use('/api/stock', stockRouter);
app.use('/api/stock_moviment', stockMovimentRouter);

// Sincronizando o banco de dados
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});
