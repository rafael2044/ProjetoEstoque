const Product = require('../models/product');

const insertProduct = async (req, res) => {
    try {
        const {name, description, price} = req.body
        const product = await Product.create({name, description, price});
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProducts = async (req, res) => {
    try{
        const product = await Product.findAll();
        return res.status(200).json(product);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getProduct = async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        return res.status(200).json(product);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

const updateProduct = async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id);
        if(!product){
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        const {name, description, price} = req.body;
        if(!name || !description || !price || price<0){
            return res.status(400).json({message:"Dados inválidos"})
        }
        product.name = name
        product.description = description
        product.price = price
        product.save()
        return res.status(201).json(product);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        await product.destroy();
        return res.status(204).json({message:"Produto excluido com sucesso"});
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

module.exports = {getProducts, getProduct, insertProduct, updateProduct, deleteProduct}