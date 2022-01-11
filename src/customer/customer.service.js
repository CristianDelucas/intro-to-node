const PetResolver = require("../pet/pet.resolver");
const StatusError = require("../_shared/error/status.error");
const Customer = require("./customer.model");

class CustomerService {

    static find() {
        return Customer.find();
    }

    static async findOne(id) {
        const customer = await Customer.findById(id);

        if (customer) {
            return customer;
        }

        throw new StatusError(404, `Customer with id <${id}> was not found`);
    }

    static async create(customer) {
        return Customer.create(customer);
    }

    static async replace(id, customer) {
        const updated = await Customer.findByIdAndUpdate(id, customer);

        if (updated) {
            return updated;
        }

        throw new StatusError(404, `Customer with id <${id}> was not found`);
    }

    static async delete(id) {
        const customer = await Customer.findById(id);

        const pets = await PetResolver.findByOwner(id)

        if(pets.length){
            throw new StatusError(400, `Customer has linked pets, you must remove pets first`);
        }

        if (customer) {
            return Customer.findByIdAndRemove(id);
        }

        throw new StatusError(404, `Customer with id <${id}> was not found`);
    }
}

module.exports = CustomerService;