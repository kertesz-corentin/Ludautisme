// const userController = require('./api/admin/users');

const loginController = require('./api/auth/login');

const userReferenceController = require('./api/user/reference');
const { adminReferenceController, userController } = require('./api/admin/index');
// const apiController = {
//      /**
//      * Default API controller to show documention url.
//      * ExpressMiddleware signature
//      * @param {object} req Express request object (not used)
//      * @param {object} res Express response object
//      * @returns {string} Route API JSON response
//      */

// }

module.exports = {
    userController, loginController, userReferenceController, adminReferenceController,
};
