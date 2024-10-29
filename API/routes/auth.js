const express = require('express');
const router = express.Router();
const {authLogin, validateToken} = require('../controllers/auth')

// Login de usuário
router.post('/login', authLogin);
router.post('/validate-token', validateToken);

module.exports = router;