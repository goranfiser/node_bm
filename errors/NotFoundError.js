const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
    constructor(message = 'Not Found') {
        super(404, message);
    }
}

module.exports = NotFoundError; 