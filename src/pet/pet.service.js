const CustomerResolver = require("../customer/customer.resolver");
const StatusError = require("../_shared/error/status.error");
const Pet = require("./pet.model");

class PetService {

    static find(extended) {

        if(extended === 'true'){
            return Pet.find().populate('owner');
        }
        return Pet.find();
    }

    static async findOne(id) {
        const pet = await Pet.findById(id);

        if (pet) {
            return pet;
        }

        throw new StatusError(404, `Pet with id <${id}> was not found`);
    }

    static async create(pet) {

        if(!pet.owner){
            throw new StatusError(400,`Owner is required`);
        }
        await CustomerResolver.ownerExistsById(pet.owner);

        const created = await Pet.create(pet);

        await CustomerResolver.addPetToCustomer(created._id, pet.owner);

        
    }

    static async replace(id, pet) {
        const updated = await Pet.findByIdAndUpdate(id, pet);

        if (updated) {
            return updated;
        }

        throw new StatusError(404, `Pet with id <${id}> was not found`);
    }

    static async delete(id) {
        const pet = await Pet.findById(id);

        if (pet) {
            return Pet.findByIdAndRemove(id);
        }

        throw new StatusError(404, `Pet with id <${id}> was not found`);
    }
}

module.exports = PetService;