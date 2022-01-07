const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    name: {type: String},
    kind: {type: String},
})

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;