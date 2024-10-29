const User = require('../models/user');
const bcrypt = require('bcryptjs')

const insertUser = async (req, res) => {
    const { name, username, password, access_level } = req.body;
    if (!name || !username || !password || !access_level){
        return res.status(400).json({message:"Está faltando dados"})
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, username, password: hashedPassword, access_level });
        res.status(201).json({id:user.id, name:user.name, username: user.username, access_level:user.access_level});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await User.findAll({attributes:['id','name', 'username', 'access_level']});
        return res.status(200).json(users);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getUser =  async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id, {attributes:['id', 'name', 'username', 'access_level']});
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

const updateUser =  async (req, res) => {
    const { name, username, password, access_level } = req.body;
    try{
        const user = await User.findByPk(req.params.id);
        if (user) {
            const updateUser = await User.update({ name, username, password, access_level });
            return res.json(updateUser);
        }
            return res.status(404).json({ message: 'Usuário não encontrado.' });
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const deleteUser =  async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            return res.status(204).json({message:"Usuario deletado com sucesso."});
        }
        return res.status(404).json({ message: 'Usuário não encontrado.' });

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {getUsers, getUser, insertUser, updateUser, deleteUser}