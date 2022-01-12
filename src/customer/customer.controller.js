const express = require('express');
const CustomerService = require('./customer.service');
const CustomerController = express.Router();

CustomerController.get('/', async (req, res, next) => {
    try {
        console.log(req.user);
        const customers = await CustomerService.find();
        res.json(customers);
    } catch (error) {
        next(error)
    }
});

CustomerController.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const customer = await CustomerService.findOne(id);

        res.json(customer);
    } catch (error) {
        next(error);
    }
});

CustomerController.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;

        const created = await CustomerService.create({ name });

        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

CustomerController.put('/:id', async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const updated = await CustomerService.replace(id, { name });

        res.json(updated);
    } catch (error) {
        next(error);
    }
})

CustomerController.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await CustomerService.delete(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

module.exports = CustomerController;