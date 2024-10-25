const express = require('express');
const {getSuppliers, getSupplier, insertSupplier, updateSupplier, deleteSupplier} = require('../controllers/supplier')

const router = express.Router();

// Cadastrar fornecedor
router.post('/', insertSupplier);

// Listar fornecedores
router.get('/', getSuppliers);

// Detalhes do fornecedor
router.get('/:id', getSupplier);

// Atualizar fornecedor
router.put('/:id', updateSupplier);

// Remover fornecedor
router.delete('/:id', deleteSupplier);

module.exports = router;
