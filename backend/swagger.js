const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes App API",
      version: "1.0.0",
      description:
        "API documentation for the Notes App with JWT authentication and role-based access",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  // Read Swagger annotations from the route files
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
