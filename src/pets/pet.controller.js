const express = require('express');
const Pet = require('./pet.model');
const PetController = express.Router();

const pets = [
    {
        id: 1,
        name: "Pepita",
        kind: "🤦‍♂️"
    },
    {
        id: 2,
        name: "Julian",
        kind: "🤦"
    },
    {
        id: 3,
        name: "Pepito",
        kind: "😎"
    }
]

PetController.get('/' , async (req, res) =>{

    const pets = await Pet.find();

     res.json(pets);
});

PetController.get('/:id', async (req, res) =>{
    const {id} = req.params;

    const pet = await Pet.findById(id);

    if(pet) {
        res.json(pet);
        return;
    }

    res.status(404).json(`Pet with id <${id}> was not found`);

});

PetController.post('/', async (req,res) =>{

    const { name, kind} = req.body;

    await Pet.create({ name, kind });
    res.status(201).send();

});

PetController.put('/:id', async (req,res) =>{

    const { id } = req.params;
    const { name, kind} = req.body;

    const pet = await Pet.findById(id);

    if(pet) {
        await Pet.findByIdAndUpdate(id, {name, kind});
        res.send();
        return;
    }
    res.status(404).json(`The pet with id <${id}> does not exist`);


});


PetController.delete('/:id', async (req,res) =>{

    const { id } = req.params;

    const pet = await Pet.findById(id);

    if(pet) {
        await Pet.findByIdAndRemove(id);
        res.status(204).send();
    }

       
    

    res.status(404).json(`The pet with id <${id}> does not exist`);


});


function getNextId(){
    const lastIndex = (pets.length)-1;
    return pets[lastIndex].id+1;
}

module.exports = PetController;