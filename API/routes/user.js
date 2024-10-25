const express = require('express');
const router = express.Router();
const {getUsers, getUser, insertUser, updateUser, deleteUser} = require("../controllers/user")

// Cadastrar usuário
router.post('/', insertUser);

// Listar usuários
router.get('/', getUsers);

// Detalhes do usuário
router.get('/:id', getUser);

// Atualizar usuário
router.put('/:id', updateUser);

// Remover usuário
router.delete('/:id',deleteUser);

module.exports = router;
