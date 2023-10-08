const referencesDataMapper = require('./references');
const userDataMapper = require('./user');
const categoryDataMapper = require('./category');
const userBookingDataMapper = require('./booking');
const permanencyDataMapper = require('./permanency');
const cartDataMapper = require('./cart');
const favoriteDataMapper = require('./favorite');
const commentDataMapper = require('./comment');

module.exports = {
    commentDataMapper,
    referencesDataMapper,
    userDataMapper,
    categoryDataMapper,
    userBookingDataMapper,
    permanencyDataMapper,
    cartDataMapper,
    favoriteDataMapper,
};
