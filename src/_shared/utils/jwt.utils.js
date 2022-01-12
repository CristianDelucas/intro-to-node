const jwt = require('jsonwebtoken')

class JwtUtils {
    static generate(id,email){
        return jwt.sign({id,email},process.env.JWT_SECRET, {expiresIn: '1d'});
    }

    static verify(token){
        return jwt.verify(token,process.env.JWT_SECRET);
    }
}

module.exports = JwtUtils;