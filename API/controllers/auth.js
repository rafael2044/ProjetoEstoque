const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require("../config")

const authLogin = async (req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({messsage:"Dados inválidos"})
        }
        const user = await User.findOne({ where: { username } });
    
        if (!user && !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        const tokenAccess = jwt.sign({ id: user.id,username: user.username, access_level: user.access_level }, config.mySecretKey, { expiresIn: '1h' });
        return res.status(201).json({ tokenAccess, access_level:user.access_level });
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
const validateToken = async(req, res)=>{
    const tokenAccess = req.headers.authorization?.split(' ')[1];
    if (!tokenAccess) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }
    
    jwt.verify(tokenAccess, config.mySecretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Token inválido.' });
        }
        
        return res.json({ message: 'Token válido.', userId: decoded.id, expiredIn: decoded.expiredIn });
    
    });
}

const authenticatedUser = async(req, res, next)=>{
    const tokenAccess = req.headers.authorization?.split(' ')[1];
    if (!tokenAccess) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }
    jwt.verify(tokenAccess, config.mySecretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Token inválido.' });
        }

        next()
    
    });
}

module.exports = {authLogin, validateToken, authenticatedUser}