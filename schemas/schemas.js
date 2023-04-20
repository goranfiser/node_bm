const Joi = require('joi');
const employeeSchema  = require('./employee/employeeSchema');
const testSchema  = require('./employee/testSchema');

const schemas = {
  employee: employeeSchema,
  testSchema: testSchema
};

const mergedSchemas = Joi.object().keys(schemas);

module.exports = mergedSchemas;