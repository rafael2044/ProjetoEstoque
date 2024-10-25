const Stock = require('../models/stock');

const insertItemStock = async (req, res) => {
    const {productId, amount} = req.body; 
    try {
        const stockItem = await Stock.create({productId, amount});
        res.status(201).json(stockItem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar estoque.' });
    }
}

const getStockItems = async (req, res) => {
    const stocks = await Stock.findAll();
    res.json(stocks);
}

const getStockItem = async (req, res) => {
    const stockItem = await Stock.findByPk(req.params.id);
    if (stockItem) {
        res.json(stockItem);
    } else {
        res.status(404).json({ error: 'Registro de estoque não encontrado.' });
    }
}

const deleteStockItem = async (req, res) => {
    const stockItem = await Stock.findByPk(req.params.id);
    if (stockItem) {
        await stockItem.destroy();
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Registro de estoque não encontrado.' });
    }
}

module.exports = {getStockItems, getStockItem, insertItemStock, deleteStockItem}