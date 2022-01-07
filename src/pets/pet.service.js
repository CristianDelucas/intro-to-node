const Pet = require('./pet.model');

class PetService{

    static find(){
        return Pet.find();
    }

    static async findOne(id){
        const pet = await Pet.findById(id);
        
        if(pet){
            return pet;
        }

        throw new StatusError(404, `Pet with id <${id}> was not found`);
    }

    static async create(pet){
        return Pet.create(pet);
    }

    static async replace(id, pet){
        const updated = await Pet.findByIdAndUpdate(id,pet);

        if(updated){
            return updated;
        }
        throw new StatusError(404, `Pet with id <${id}> was not found`);
    }

    static async delete(id){
        const pet = await Pet.findById(id);

        if(pet){
            return await Pet.findByIdAndRemove(id);
        }
        throw new StatusError(404, `Pet with id <${id}> was not found`);
    }
}

module.exports = PetService;