const express = require('express');
const upload = require('../_shared/middleware/file.middleware');
const PetService = require('./pet.service');
const PetController = express.Router();

PetController.get('/', async (req, res, next) => {
    try {
        const pet = await PetService.find(req.query.extended);
        res.json(pet);
    } catch (error) {
        next(error)
    }
});

PetController.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const pet = await PetService.findOne(id);

        res.json(pet);
    } catch (error) {
        next(error);
    }
});

PetController.post('/', upload.single('image') , async (req, res, next) => {
    try {
        const { name, kind, owner } = req.body;

        const created = await PetService.create({ name, kind, owner }, req.file);

        res.status(201).json(created);
    } catch (error) {
        next(error);
    }
})

PetController.put('/:id', async (req, res, next) => {
    try {
        const { name, kind } = req.body;
        const { id } = req.params;

        const updated = await PetService.replace(id, { name, kind });

        res.json(updated);
    } catch (error) {
        next(error);
    }
})

PetController.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await PetService.delete(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
})

module.exports = PetController;