const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Finance Tracker API',
      version: '1.0.0',
      description: 'API for managing personal finances'
    },
    servers: [{ url: 'https://personal-finance-tracker-api-k3ya.onrender.com' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'https',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
            name: { type: 'string' }
          }
        },
        Transaction: {
          type: 'object',
          properties: {
            amount: { type: 'number' },
            description: { type: 'string' },
            categoryId: { type: 'string' },
            date: { type: 'string', format: 'date' },
            type: { type: 'string', enum: ['income', 'expense'] },
            tags: { type: 'array', items: { type: 'string' } },
            notes: { type: 'string' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJSDoc(options);