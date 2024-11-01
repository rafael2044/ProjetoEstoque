const express = require('express');
const router = express.Router();
const {getUsers, getUser, insertUser, updateUser, deleteUser} = require("../controllers/user")
const {authenticatedUser, isAdmin} = require('../controllers/auth')

// Cadastrar usuário
router.post('/', authenticatedUser,isAdmin, insertUser);

// Listar usuários
router.get('/', authenticatedUser, getUsers);

// Detalhes do usuário
router.get('/:id', authenticatedUser, getUser);

// Atualizar usuário
router.put('/:id', authenticatedUser, isAdmin,updateUser);

// Remover usuário
router.delete('/:id',authenticatedUser, isAdmin,deleteUser);

module.exports = router;
