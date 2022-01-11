const express = require('express');
const AdminService = require('./admin.service');
const AdminController = express.Router();

AdminController.get('/', async (req, res, next) => {
    try {
        const admins = await AdminService.find();
        res.json(admins);
    } catch (error) {
        next(error)
    }
});

AdminController.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const admin = await AdminService.findOne(id);

        res.json(admin);
    } catch (error) {
        next(error);
    }
});

AdminController.post('/', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const created = await AdminService.create({ name, email, password });

        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

AdminController.put('/:id', async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const updated = await AdminService.replace(id, { name });

        res.json(updated);
    } catch (error) {
        next(error);
    }
})

AdminController.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await AdminService.delete(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

module.exports = AdminController;