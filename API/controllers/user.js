const User = require('../models/user');

const insertUser = async (req, res) => {
    try {
        const { name, username, password, access_level } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, username, password: hashedPassword, access_level });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
}

const getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}

const getUser =  async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado.' });
    }
}

const updateUser =  async (req, res) => {
    const { name, username, password, access_level } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
        const updateUser = await User.update({ name, username, password, access_level });
        res.json(updateUser);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado.' });
    }
}

const deleteUser =  async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Usuário não encontrado.' });
    }
}

module.exports = {getUsers, getUser, insertUser, updateUser, deleteUser}