const express = require('express');
const PetController = require('./pets/pet.controller');


const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/pets', PetController);


app.use('*', (req,res) => res.status(401).json("Path not existing"));

app.listen(3000, () => console.info(`Server is running in http://localhost:${PORT}`));