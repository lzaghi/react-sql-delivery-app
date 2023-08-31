const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Delivery App API',
    description: 'API para funcionalidades do App de Delivery',
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['../app.js'];

/* NOTE: if you use the express Router, you must pass in the 
  'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);