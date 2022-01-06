const express = require('express');
const CustomerController = express.Router();


const customers = [
    {
        id:1,
        name: 'Sergio',
        registeredAt: new Date('2021-10-20T12:23:28.098Z'),
        updateAt: new Date('2021-10-26T19:17:53.379Z'),
    },
    {
        id:2,
        name: 'Julian',
        registeredAt: new Date('2021-10-20T12:23:28.098Z'),
        updateAt: new Date('2021-10-26T19:17:53.379Z'),
    },
    {
        id:3,
        name: 'Pepe',
        registeredAt: new Date('2021-10-20T12:23:28.098Z'),
        updateAt: new Date('2021-10-26T19:17:53.379Z'),
    }
]


CustomerController.get('/', (req,res)=>{
    res.json(customers);
});

CustomerController.get('/:id', (req,res) =>{
    const { id } = req.params;

    let parseId = safeParseInt(id);

    const customer = customers.find(customer => customer.id == parseId);

    if(customer){
        res.json(customer);
        return;
    }

    res.status(404).json(`Customer with id <${id}> was not found`);

})

CustomerController.delete('/:id', (req,res) =>{
    const {id} = req.params;

    let parsedId = safeParseInt(id);

    const indexOfCustomer = customers.findIndex(customer => customer.id == parsedId);

    if(indexOfCustomer !== -1){
        customers.splice(indexOfCustomer,0);
        res.status(201).send();
        return;
    }

    res.status(404).json(`The customer with id <${id}> does not exist`);
});

function getNextId() {
    return customers.reduce((greatest, current) => greatest = greatest => current.id ? greatest : current.id, 0)+1;
}

function safeParseInt(stringInteger){
    try{
        return parseInt(stringInteger);
    }catch(e){
        return null;
    }
}

module.exports = CustomerController;