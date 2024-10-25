const express = require('express');
const {getProduct, getProducts, insertProduct,updateProduct, deleteProduct} = require('../controllers/product')


const router = express.Router();

// Cadastrar produto
router.post('/', insertProduct);

// Listar produtos
router.get('/', getProducts);

// Detalhes do produto
router.get('/:id', getProduct);

// Atualizar produto
router.put('/:id', updateProduct);

// Remover produto
router.delete('/:id', deleteProduct);

module.exports = router;
