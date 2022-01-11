const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customer = {
    name: { type: String },
    pets: [{ type: mongoose.Types.ObjectId, ref:'Pet'}]
}

const customerSchema = new Schema(customer, { timestamps: true })

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;