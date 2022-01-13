const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pet = {
    name: { type: String , required: true },
    kind: { type: String },
    owner: { type: mongoose.Types.ObjectId, ref: 'Customer', required: true},
    image: { type: String}
};

const petSchema = new Schema(pet, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;