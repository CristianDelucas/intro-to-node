const StatusError = require("../_shared/error/status.error");
const Admin = require("./admin.model");
const bcrypt = require('bcrypt');
const JwtUtils = require("../_shared/utils/jwt.utils");

class AdminService {

    static find() {
        return Admin.find();
    }

    static async findOne(id) {
        const admin = await Admin.findById(id);

        if (admin) {
            return admin;
        }

        throw new StatusError(404, `Admin with id <${id}> was not found`);
    }

    static async create(admin) {


        const found = await  Admin.findOne({email:admin.email});
        
        if(found){
            throw new StatusError(404, `Admin with email <${admin.email}> already exists`);
        }

        const hashedPassword = await bcrypt.hash(admin.password,10);

        return Admin.create({...admin, password: hashedPassword});
    }

    static async login(admin) {

        const found = await  Admin.findOne({email:admin.email});
        
        if(!found){
            throw new StatusError(404, `Admin not exists by email`);
        }

        const isValidPassword = await bcrypt.compare(admin.password,found.password);

        if(!isValidPassword){
            throw new StatusError(403, `Invalid credentials`);
        }

        const token = JwtUtils.generate(found._id,found.email);

        return {token};
        
    }

    static async replace(id, admin) {
        const updated = await Admin.findByIdAndUpdate(id, admin);

        if (updated) {
            return updated;
        }

        throw new StatusError(404, `Admin with id <${id}> was not found`);
    }

    static async delete(id) {
        const admin = await Admin.findById(id);

        if (admin) {
            return Admin.findByIdAndRemove(id);
        }

        throw new StatusError(404, `Admin with id <${id}> was not found`);
    }
}

module.exports = AdminService;