const usersController = require('./users');

const loginController = require('./login');
// const apiController = {
//      /**
//      * Default API controller to show documention url.
//      * ExpressMiddleware signature
//      * @param {object} req Express request object (not used)
//      * @param {object} res Express response object
//      * @returns {string} Route API JSON response
//      */

// }

module.exports = { usersController, loginController };
