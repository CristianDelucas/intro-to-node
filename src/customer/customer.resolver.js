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
}

module.exports = CustomerResolver;