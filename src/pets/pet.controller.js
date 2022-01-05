const express = require('express');
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

PetController.get('/' , (req, res) =>{
    res.json(pets);
});

PetController.get('/:id', (req, res) =>{
    const {id} = req.params;

    const pet = pets.find(pet => pet.id == id);

    if(pet) {
        res.json(pet);
        return;
    }

    res.status(404).json(`Pet with id <${id} was not found`);

});

PetController.post('/', (req,res) =>{

    const { name, kind} = req.body;

    pets.push({id: getNextId() ,name, kind});

    res.status(201).send();


});

PetController.put('/:id', (req,res) =>{

    const { id } = req.params;
    const { name, kind} = req.body;

    const indexOfPet = pets.findIndex(pet => pet.id == id);

    if(indexOfPet !== -1){
        pets[indexOfPet] = {id: pets[indexOfPet].id, name, kind};
        res.status(200).send();
        return;
    }    

    res.status(404).json(`The pet with id <${id}> does not exist`);


});


PetController.delete('/:id', (req,res) =>{

    const { id } = req.params;

    const indexOfPet = pets.findIndex(pet => pet.id == id);

    if(indexOfPet !== -1){
        pets.splice(indexOfPet,1);
        res.status(204).send();
        return;
    }
    

    res.status(404).json(`The pet with id <${id}> does not exist`);


});


function getNextId(){
    const lastIndex = (pets.length)-1;
    return pets[lastIndex].id+1;
}

module.exports = PetController;