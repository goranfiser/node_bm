const Joi = require('joi');

const employeeSchema = Joi.object({
    name:  Joi.string()
        .regex(/^[a-zA-Z0-9\s]{3,30}$/)
        .required(),
    description:  Joi.string()
        .max(200)
        .required(),
    employees: Joi.array().items(Joi.number().integer()).optional()
}).options({ stripUnknown: true });

module.exports = employeeSchema;