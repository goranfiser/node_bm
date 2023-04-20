const BaseError = require("./BaseError");

class DuplicateEmailError extends BaseError {
  constructor(message) {
    super(409, message);
    this.name = 'DuplicateEmailError';
  }
}

module.exports = DuplicateEmailError; 