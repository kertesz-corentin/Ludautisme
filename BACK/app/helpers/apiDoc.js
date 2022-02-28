const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: '1.0.0',
<<<<<<< HEAD
        title: "Lud'autisme",
        description: "API de gestion d'emprunt de jeux",
    },
    baseDir: __dirname,
    filesPattern: ['../routes/**/*.js', '../models/**/*.js', '../errors/**/*.js'],
    // Doc URL
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    //Serve API doc
=======
        title: "O'blog",
        description: "Blog de l'école O'clock",
    },
    baseDir: __dirname,
    // On analyse tous les fichiers du projet
    filesPattern: ['../routes/**/*.js', '../models/*.js', '../errors/*.js'],
    // URL où sera disponible la page de documentation
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
    // Activation de la documentation à travers une route de l'API
>>>>>>> 435f48baaf7248ed27833c923e3d569616c7b082
    exposeApiDocs: true,
    apiDocsPath: '/api/docs',
};

/**
 *
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);

