const BaseError = require("./BaseError");

class ConflictError extends BaseError {
    constructor(message = 'Conflict') {
      super(409, message);
    }
  }

 module.exports = ConflictError; 