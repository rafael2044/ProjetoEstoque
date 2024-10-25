const Product = require('../models/product');

const insertProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar produto.' });
    }
}

const getProducts = async (req, res) => {
    const product = await Product.findAll();
    res.json(product);
}

const getProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
}

const updateProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    const {name, description, price} = req.body;
    if (product) {
        const updatedProduct = await product.update({name, description, price});
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
}

const deleteProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
        await product.destroy();
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Produto não encontrado.' });
    }
}

module.exports = {getProducts, getProduct, insertProduct, updateProduct, deleteProduct}