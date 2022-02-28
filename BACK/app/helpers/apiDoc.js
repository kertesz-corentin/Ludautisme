const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: '1.0.0',
        title: "Lud'autisme",
        description: "API de gestion d'emprunt de jeux",
    },
    baseDir: __dirname,
    filesPattern: ['../routes/**/*.js', '../models/**/*.js', '../errors/**/*.js'],
    // Doc URL
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    //Serve API doc
    exposeApiDocs: true,
    apiDocsPath: '/api/docs',
};

/**
 *
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);

