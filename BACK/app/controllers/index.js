// const userController = require('./api/admin/users');

const loginController = require('./api/auth/login');
const userController = require('./api/admin/users');
const adminReferenceController = require('./api/admin/reference');
const bookingController = require('./api/admin/booking');
const permanencyController = require('./api/admin/permanency');
const pictureController = require('./api/admin/picture');
const articleController = require('./api/admin/article');

module.exports = {
    userController,
    loginController,
    adminReferenceController,
    bookingController,
    permanencyController,
    pictureController,
    articleController,
};
