const Supplier = require('../models/supplier');

const insertSupplier = async (req, res) => {
    try {
        const {name, contact, address} = req.body;
        if(!name || !contact || !address){
            return res.status(400).json({message:"Dados inválidos"})
        }
        const supplier = await Supplier.create({name, contact, address});
        return res.status(201).json(supplier);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getSuppliers = async (req, res) => {
    try{
        const suppliers = await Supplier.findAll();
        return res.status(200).json(suppliers);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getSupplier = async (req, res) => {
    try{
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Fornecedor não encontrado.' });
        } 
        return res.status(200).json(supplier);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const updateSupplier = async (req, res) => {
    try{
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Fornecedor não encontrado.' });
        }
        const {name, contact, address} = req.body
        if(!name || !contact || !address){
            return res.status(400).json({message:"Dados inválidos"})
        }
        supplier.name = name
        supplier.contact = contact
        supplier.address = address
        await supplier.save();
        return res.status(201).json(supplier);

    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

const deleteSupplier = async (req, res) => {
    try{
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) {
            res.status(404).json({ message: error.message });
        }
        await supplier.destroy();
        res.status(204).json({message:"Fornecedor excluido com sucesso"});
    }catch(error){
        return res.status(500).json({message:error.message})
    }
    
}

module.exports = {getSuppliers, getSupplier, insertSupplier, updateSupplier, deleteSupplier}