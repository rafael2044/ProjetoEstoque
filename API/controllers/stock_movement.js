const StockMoviment = require('../models/stock_movement');
const Product = require('../models/product')
const User = require('../models/user')
const Supplier = require('../models/supplier')
const Stock = require("../models/stock")

const validateDataInsert = async (req, res, next)=>{
    const {amount,type, productId, userId, supplierId} = req.body
    if (!amount || !type || !productId || !userId || !supplierId){
        return res.status(400).json({message:"Dados inválidos."})
    }
    if (amount<=0){
        return res.status(400).json({message:"A quantidade precisa ser maior que 0"})
    }
    try{
        if (!await Product.findByPk(productId)){
            return res.status(400).json({message:"Produto não encontrado."});
        }

        if(!await User.findByPk(userId)){
            return res.status(400).json({message:"Usuário não encontrado."})
        }
    
        if (!await Supplier.findByPk(supplierId)){
            return res.status(400).json({message:"Fornecedor não encontrado."})
        }
        next()
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

const insertMovementStock =  async (req, res) => {
    try {
        const movement = await StockMoviment.create(req.body);
        return res.status(201).json(movement)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar movimentação.' });
    }
}

const getMovementsStock = async (req, res) => {
    try{
        const movements = await StockMoviment.findAll();
        res.status(200).json(movements);
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

const getMovementStock = async (req, res) => {
    try{
        const movement = await StockMoviment.findByPk(req.params.id);
        if (!movement) {
            return res.status(404).json({ message: 'Movimentação não encontrada.' });
        }
        return res.status(200).json(movement);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const updateMovementStock = async (req, res) => {
    try{
        const {amount, type} = req.body;
        if (!amount || amount<0 || !type){
            return res.status(400).json({message:"Dados inválidos"})
        }
        const movimentacao = await StockMoviment.findByPk(req.params.id);
        if (!movimentacao) {
            res.status(404).json({ message: 'Movimentação não encontrada.' });
        }
        movimentacao.amount = amount
        movimentacao.type = type
        await movimentacao.save();
        return res.status(201).json(movimentacao);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const deleteMovementStock = async (req, res) => {
    try{
        const movement = await StockMoviment.findByPk(req.params.id);
        if (!movement) {
            res.status(404).json({ message: 'Movimentação não encontrada.' });
        }
        await movement.destroy();
        res.status(204).json({message:"Movimentação excluida com sucesso"});
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

module.exports = {getMovementStock, getMovementsStock, insertMovementStock, updateMovementStock, deleteMovementStock, validateDataInsert}