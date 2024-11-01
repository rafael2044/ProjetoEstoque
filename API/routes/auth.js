const express = require('express');
const router = express.Router();
const {authLogin, validateToken, refreshToken} = require('../controllers/auth')

// Login de usuário
router.post('/login', authLogin);
router.get('/validate-token', validateToken);
router.get('/refresh-token', refreshToken)

module.exports = router;