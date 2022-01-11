const Pet = require("./pet.model");

class PetResolver {
    
    static findByOwner(id){
        return Pet.find({owner : id});
    }

}

module.exports = PetResolver;