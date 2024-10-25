const express = require('express');
const router = express.Router();
const {authLogin} = require('../controllers/auth')

// Login de usuário
router.post('/login', authLogin);

module.exports = router;