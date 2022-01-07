const express = require('express');
const PetService = require('./pet.service');
const PetController = express.Router();



PetController.get('/', async (req,res, next)=>{

    try{
        const pets = await PetService.find();
        res.json(pets);
    }catch(error){
        next(error);
    }
    
    
});

PetController.get('/:id', async (req,res, next) =>{
    

    try{
        const { id } = req.params;
        const pet = await PetService.findOne(id);

        res.json(pet);
    }catch(error){
        next(error);
    }
})

PetController.post('/', async (req,res, next) =>{

    try{
        const { name, kind} = req.body;

        const created = await PetService.create({ name });
        res.status(201).send(created);

    }catch(error){
        next(error);
    }
    

});


PetController.put('/:id', async (req,res, next) =>{

    try{
        const { name, kind} = req.body;
        const { id } = req.params;
        

        const updated = await PetService.replace(id,{name});

        res.json(updated);

    }catch(error){
        next(error);
    }
});

PetController.delete('/:id', async (req,res, next) =>{

    try{
    const {id} = req.params;

    await PetService.delete(id);

    res.status(204).send();

    }catch (error){
        next(error);
    }
});

module.exports = PetController;