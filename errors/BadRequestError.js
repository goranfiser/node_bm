const BaseError = require("./BaseError");

class BadRequestError extends BaseError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

module.exports = BadRequestError; 