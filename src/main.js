const express = require('express');
const mongoose = require('mongoose');
const AdminController = require('./admin/admin.controller');
const CustomerController = require('./customer/customer.controller');
const PetController = require('./pet/pet.controller');
const logging = require('./_shared/middleware/login.middleware');
const secured = require('./_shared/middleware/secured.middleware');
const { defaults } = require('./_shared/utils');
const cloudinary = require('cloudinary').v2;
const app = express();

require('dotenv').config()

const PORT = defaults(process.env.PORT, 3000);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.use(express.json());
//para poder leer un formato distinto (en el tema de imagenes)
app.use(express.urlencoded({extended:true}));
app.use(logging);

// ROUTES
app.use('/pets', PetController);
app.use('/customers', secured, CustomerController);
app.use('/admin', AdminController);
app.use('*', (req, res) => res.status(404).json("Path not existing"));

// BASE ERROR HANDLER
app.use((error, req, res, next) => {

    const exception = {
        status: defaults(error.status, 500),
        message: defaults(error.message, 'An unexpected error happened'),
    }

    if (process.env.NODE_ENV !== 'production') {
        exception['callstack'] = error.stack;
    }

    console.error(exception);
    res.status(exception.status).json(exception)
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.info(`Server is running in http://localhost:${PORT}`))
    );