const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
            description: "Documentació de l'API del projecte e-commerce"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Servidor local (Port 5000 p. defecte)"
            }
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", description: "ID únic generat per MongoDB" },
                        name: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string", enum: ["user", "admin"] }
                    }
                },
                Vehiculo: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        marca: { type: "string" },
                        modelo: { type: "string" },
                        precio: { type: "number" },
                        estado: { type: "string", enum: ["Nuevo", "Usado"] }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
