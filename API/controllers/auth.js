const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const InvalidToken = require('../models/invalidToken')
const RefreshToken = require('../models/refreshToken')

const config = require("../config")
const createError = require('../utils/appError')

const authLogin = async (req, res, next) => {
    try{
      const { username, password } = req.body;
      if(!username || !password){
          return next (new createError("Dados inválidos", 400))
      }
      const user = await User.findOne({ where: { username } });
      
      if (!user) return next(new createError("Usuário não existe.", 404));

      if (!await bcrypt.compare(password, user.password)) return next(new createError('Senha incorreta.', 401))
      const refreshToken = generateRefreshToken({id:user.id, username:user.username, access_level:user.access_level})
      const newRefreshToken = await RefreshToken.create({userId:user.id, token:refreshToken, expiresIn:jwt.decode(refreshToken).exp})
      const accessToken = generateAccessToken({id:user.id, username:user.username, access_level:user.access_level})

      return res.status(201).json({accessToken, refreshToken, user:{id:user.id, username:user.username, access_level:user.access_level}});
    }catch(error){
        return next(error)
    }
}

const validateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(new createError("Unauthorized", 403))
    }
    if (await InvalidToken.findOne({where:{token}})) return next(new createError("Token Expired", 403))
    jwt.verify(token, config.mySecretKey, (err, decoded) => {
      if (err) {
        return next(new createError("Invalid Token", 403)) // Proibido
      }

      return res.status(200).json({ message: 'Valid Token ', accessToken: token, user:{id:decoded.id, name:decoded.name, username:decoded.username, access_level: decoded.access_level}}); // Retorna o token
    });
}

const refreshToken = async (req, res, next) => {
    const refreshToken = req.headers.authorization.split(' ')[1]
    if (!refreshToken) {
      return next(new createError("RefreshToken não encontrada.", 404)) // Proibido
    }
    if (!await RefreshToken.findOne({where:{token:refreshToken}})){
      return next(new createError("refreshToken Inválida", 403)) 
    }
  
    jwt.verify(refreshToken, config.mySecretKey, (err, decoded) => {
      if (err) {
        return next(createError("RefreshToken Expirada", 403)); // Proibido
      }
      const user = { id: decoded.id, name:decoded.name, username:decoded.username, access_level: decoded.access_level }
      const newAccessToken = generateAccessToken(user);
      return res.status(200).json({ accessToken: newAccessToken, user });
    });
  }

const authenticatedUser = async(req, res, next)=>{
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`AuthenticatedUser ${token}`);
    if (!token) {
      return next(new createError("Unauthorized", 403))
    }

    jwt.verify(token, config.mySecretKey, (err, decoded) => {
      if (err) {
        return next(new createError("Unauthorized", 403)) // Proibido
      }
      next() // Executa a proxima função
    });
}

const isAdmin = async(req, res, next)=>{
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1];
  const access_level = jwt.decode(token).access_level;
  if(!(access_level === "administrador")){
    return next(new createError("Nivél de Acesso inválido", 403))
  }
  next()
}

const generateAccessToken = (user) => {
    return jwt.sign(user, config.mySecretKey, { expiresIn: '15m' }); // Token expira em 15 minutos
};
const generateRefreshToken = (user) => {
  return jwt.sign(user, config.mySecretKey, { expiresIn: '30d' }); // Token expira em 30 dias
};

module.exports = {authLogin, authenticatedUser, refreshToken, validateToken, isAdmin}