const AdminService = require("../../admin/admin.service");
const StatusError = require("../error/status.error");
const JwtUtils = require("../utils/jwt.utils");

const secured = async (req, res, next) => {

    try{
        const token = req.headers.authorization;
        if(!token){
            throw new StatusError(403,'Unauthorized');
        }

        const parsedToken = token.replace('Bearer ', '');

        const validToken = JwtUtils.verify(parsedToken);

        const admin = await AdminService.findOne(validToken.id);

        admin.password = '';

        req.user = admin;

        next();

    }catch(error){
        next(error);
    }

} 

module.exports = secured;