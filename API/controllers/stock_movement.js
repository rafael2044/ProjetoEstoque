const StockMoviment = require('../models/stock_movement');

const insertMovementStock =  async (req, res) => {
    try {
        const movimentacao = await StockMoviment.create(req.body);
        res.status(201).json(movimentacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar movimentação.' });
    }
}

const getMovementsStock = async (req, res) => {
    const movements = await StockMoviment.findAll();
    res.json(movements);
}

const getMovementStock = async (req, res) => {
    const movement = await StockMoviment.findByPk(req.params.id);
    if (movement) {
        res.json(movement);
    } else {
        res.status(404).json({ error: 'Movimentação não encontrada.' });
    }
}

const updateMovementStock = async (req, res) => {
    const movimentacao = await StockMoviment.findByPk(req.params.id);
    if (movimentacao) {
        const updatedMovimentacao = await movimentacao.update(req.body);
        res.json(updatedMovimentacao);
    } else {
        res.status(404).json({ error: 'Movimentação não encontrada.' });
    }
}

const deleteMovementStock = async (req, res) => {
    const movement = await StockMoviment.findByPk(req.params.id);
    if (movement) {
        await movement.destroy();
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Movimentação não encontrada.' });
    }
}

module.exports = {getMovementStock, getMovementsStock, insertMovementStock, updateMovementStock, deleteMovementStock}