const StatusError = require("../_shared/error/status.error");
const Admin = require("./admin.model");

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
        return Admin.create(admin);
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