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
                    required: ["nombre", "apellido", "username", "email", "password"],
                    properties: {
                        nombre: { type: "string", example: "Juan" },
                        apellido: { type: "string", example: "Pérez" },
                        username: { type: "string", example: "juanperez99" },
                        email: { type: "string", example: "juan@gmail.com" },
                        password: { type: "string", example: "secreta123" },
                        role: { type: "string", enum: ["user", "admin"], example: "user" }
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
