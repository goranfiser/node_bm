const Joi = require('joi');

function validateRequest(schema) {
  return (req, res, next) => {
    const options = {
      abortEarly: false, // Return all errors instead of stopping at the first one
      allowUnknown: true // Allow unknown properties in the request body
    };

    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    }
    req.body = value;
    next();
  };
}

module.exports = validateRequest;