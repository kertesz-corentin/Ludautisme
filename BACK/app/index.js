const express = require('express');
const cors = require('cors');
const swaggerJSDoc = require('./helpers/apiDoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes');

const app = express();

//Swagger
app.use('/api/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerJSDoc));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

module.exports = app;
