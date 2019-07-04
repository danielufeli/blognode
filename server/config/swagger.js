import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Blogging System',
    version: '1.0.0',
    description: 'A Blogging System for C & I ',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'x-auth-token',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['*/swagger-doc/*.yaml'],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
