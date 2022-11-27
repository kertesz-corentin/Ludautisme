const jwt = require('jsonwebtoken');
const ApiError = require('../errors/apiError');

module.exports = {
    /**
     * test if user id in token and user id in request is the same
     * @param {*} req request object for take token
     * @param {*} idUser user give by user in the request
     */
    testUser(req, idUser) {
        if (!req.headers['x-access-token']) {
            throw new ApiError(403, 'Pas de token');
        }
        const token = req.headers['x-access-token'];
        const decodedToken = jwt.verify(token, process.env.SALT);
        const { userId } = decodedToken;

        if (userId !== idUser) {
            throw new ApiError(403, 'Identification invalide');
        }
    },
};
