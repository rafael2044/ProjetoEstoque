const express = require('express');
const {getMovementStock, getMovementsStock, insertMovementStock, updateMovementStock, deleteMovementStock} = require('../controllers/stock_movement')

const router = express.Router();

// Cadastrar movimentação
router.post('/',insertMovementStock);

// Listar movimentações
router.get('/', getMovementsStock);

// Detalhes da movimentação
router.get('/:id', getMovementStock);

// Atualizar movimentação
router.put('/:id', updateMovementStock);

// Remover movimentação
router.delete('/:id', deleteMovementStock);

module.exports = router;
