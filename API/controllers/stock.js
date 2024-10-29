const Stock = require('../models/stock');
const Product = require('../models/product')

const incrementDecrementItemStock = async(req, res, next)=>{
    const {productId, amount, type} = req.body;
    const stockProduct = await Stock.findOne({where:{productId}})
    if (!stockProduct){
        return res.status(400).json("Produto não cadastrado em estoque")
    }
    switch(type){
        case "entrada":
            stockProduct.amount+=amount
            break;
        case "saida":
            if (stockProduct.amount < amount){
                return res.status(400).json({message:"Quantidade em estoque insuficiente"})
            }
            stockProduct.amount-= amount
            break;
        default:
            return res.status(400).json({message:"Tipo de movimento inválido"})
    }
    await stockProduct.save()
    next()
}

const insertItemStock = async (req, res) => {
    const {productId, amount} = req.body; 
    try {
        if (!await Product.findByPk(productId)){
            return res.status(400).json({message:"Produto não existente"})
        }
        const stockItem = await Stock.create({productId, amount});
        return res.status(201).json(stockItem);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

const getStockItems = async (req, res) => {
    try{
        const stocks = await Stock.findAll();
        res.status(200).json(stocks);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getStockItem = async (req, res) => {
    try{
        const stockItem = await Stock.findByPk(req.params.id);
        if (!stockItem) {
            return res.status(404).json({ message: 'Registro de estoque não encontrado.' });
        } 
        return res.status(200).json(stockItem);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

const deleteStockItem = async (req, res) => {
    try{
        const stockItem = await Stock.findByPk(req.params.id);
        if (!stockItem) {
            return res.status(404).json({ error: 'Registro de estoque não encontrado.' });
        }
        await stockItem.destroy();
        return res.status(204).json({message:"Produto removido do estoque"});
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

module.exports = {getStockItems, getStockItem, insertItemStock, deleteStockItem, incrementDecrementItemStock}