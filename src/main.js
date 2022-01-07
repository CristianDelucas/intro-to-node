const express = require('express');
const mongoose = require('mongoose');

const PetController = require('./pets/pet.controller');
const CustomerController = require('./customer/customer.controller');

const {defaults} = require('./_shared/utils');
const e = require('express');
const app = express();

require('dotenv').config();


//Port defect
const PORT = defaults(process.env.PORT, 3000);




const loggingMiddleware = (req,res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
};

app.use(express.json());
app.use('/', loggingMiddleware);

//Routes
app.use('/pets', PetController);
<<<<<<< HEAD


app.use('*', (req,res) => res.status(401).json("Path not existing"));
=======
app.use('/customers', CustomerController);
app.use('*',(req, res) => res.status(401).json("Path not existing"));

//Base error handler
app.use((error, req, res, next)=>{
    const exception = {
        status: defaults(error.status, 500),
        message: defaults(error.message, 'An unexpected error happened'),
    }

    if(process.env.NODE_ENV !== 'production') {
        exception['callstack'] = error.stack;
    }
    console.error(exception);
    res.status(exception.status).json(exception);
})


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(3000, () => console.info(`Server is running in http://localhost:${PORT}`));
    });
>>>>>>> 4-connecting-to-mongo

