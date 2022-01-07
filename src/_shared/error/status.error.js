class StatusError extends Error {
    
    status = 500;
    
    constructor(status,error){
        super(error);
        this.status = status;
    }
}

module.exports = StatusError;