const express = require('express');
const {getStockItems, getStockItem, insertItemStock, deleteStockItem} = require('../controllers/stock')

const router = express.Router();

// Cadastrar estoque
router.post('/',insertItemStock);

// Listar estoque
router.get('/', getStockItems);

// Detalhes do estoque
router.get('/:id', getStockItem);

// Remover estoque
router.delete('/:id', deleteStockItem);

module.exports = router;
