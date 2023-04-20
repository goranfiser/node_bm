const swaggerJSDoc = require('swagger-jsdoc');

const endpointsFiles = ['./routes/*.js'];

const doc = {
  swaggerDefinition: {
    info: {
      title: 'API Documentation',
      description: 'This is a sample API documentation.',
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
  },
  apis: endpointsFiles
};

const swaggerFile = swaggerJSDoc(doc);

module.exports = swaggerFile;