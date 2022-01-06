const express = require('express');
const mongoose = require('mongoose');

const PetController = require('./pets/pet.controller');
const CustomerController = require('./customer/customer.controller');


const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/pets', PetController);
app.use('/pets', CustomerController);
app.use('*', (req,res) => res.status(401).json("Path not existing"));

mongoose.connect('mongodb+srv://admin:admin@intro-to-node.nhdok.mongodb.net/intro-to-node?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    app.listen(3000, () => console.info(`Server is running in http://localhost:${PORT}`));
});

