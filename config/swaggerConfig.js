const schema = require('../swagger/schemaSwagger'); 

const swaggerConfig = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Danendra Dipa Manajemen Buku',
            version: '1.0.0',
            description: 'Dokumentasi API Manajemen Buku',
            contact: {
                name: 'Danendra Dipa',
                email: 'danendrach@gmail.com',
            },
        },
        servers: [
            {
                url: process.env.BASE_URL || 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
          components: schema.components,
        },
    },
    apis: ['./routes/*.js', './swagger/*.js'],
};

module.exports = swaggerConfig;
