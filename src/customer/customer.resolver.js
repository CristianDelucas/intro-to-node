const CustomerService = require("./customer.service");

class CustomerResolver{
    static async ownerExistsById(id){
        try{
            await CustomerService.findOne(id);
            return true;
        }catch(error){
            throw error;
        }
    }

    static async addPetToCustomer(petId, customerId){
        const customer = await CustomerService.findOne(customerId);
        customer.pets ? customer.pets.push(petId):[petId];
        customer.save();
    }
}

module.exports = CustomerResolver;