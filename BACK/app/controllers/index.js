// const userController = require('./api/admin/users');

const loginController = require('./api/auth/login');
const userController = require('./api/admin/users');
const userReferenceController = require('./api/user/reference');
const adminReferenceController = require('./api/admin/reference');
const bookingController = require('./api/admin/booking');
const permanencyController = require('./api/admin/permanency');

module.exports = {
    userController,
    loginController,
    userReferenceController,
    adminReferenceController,
    bookingController,
    permanencyController,
};
