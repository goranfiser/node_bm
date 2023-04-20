const Joi = require('joi');

const employeeSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }),
    image: Joi.binary().optional()
        .custom((value) => {
            console.log(value);
            if (!value) {
                return value;
            }
            if (!(value instanceof Buffer)) {
                return null;
            }
            if (value.length < 1) {
                return null;
            }
            return value;
        }),
    skills: Joi.array().items(Joi.number().integer()).min(1).messages({
        'array.min': 'At least one skill is required',
        'number.base': 'Skills must be integers'
    })
})
    .custom((value) => {
        // Check if image property is present
        if (!value.image) {
            // Remove the image property from the object
            delete value.image;
        }
        return value;
    })
    .options({ stripUnknown: true });

module.exports = employeeSchema;