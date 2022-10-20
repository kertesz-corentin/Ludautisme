const jwt = require('jsonwebtoken');
const ApiError = require('../errors/apiError');
require('dotenv').config();

module.exports = (req, res, next) => {
    if (!req.headers['x-access-token']) {
        throw new ApiError(403, 'Pas de token');
    }
    const token = req.headers['x-access-token'];
    const decodedToken = jwt.verify(token, process.env.SALT);
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
        res.json({ status: 'error', statusCode: 403, message: 'Identification invalide' });
    } else {
        next();
    }
};
