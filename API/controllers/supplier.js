const Supplier = require('../models/supplier');

const insertSupplier = async (req, res) => {
    const {name, contact, address} = res.body;
    try {
        const supplier = await Supplier.create({name, contact, address});
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar fornecedor.' });
    }
}

const getSuppliers = async (req, res) => {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
}

const getSupplier = async (req, res) => {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
        res.json(supplier);
    } else {
        res.status(404).json({ error: 'Fornecedor não encontrado.' });
    }
}

const updateSupplier = async (req, res) => {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
        const {name, contact, address} = req.body
        const updatedSupplier = await fornecedor.update({name, contact, address});
        res.json(updatedSupplier);
    } else {
        res.status(404).json({ error: 'Fornecedor não encontrado.' });
    }
}

const deleteSupplier = async (req, res) => {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
        await supplier.destroy();
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Fornecedor não encontrado.' });
    }
}

module.exports = {getSuppliers, getSupplier, insertSupplier, updateSupplier, deleteSupplier}