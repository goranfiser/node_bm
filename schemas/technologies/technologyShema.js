const Joi = require('joi');

const technologySchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
})

module.exports = technologySchema;