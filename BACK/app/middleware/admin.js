const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.json({ status: 'error', statusCode: 403, message: 'Identification invalide' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SALT);
    const { userId, role } = decodedToken;
    if (role !== 'admin') {
        res.json({ status: 'error', statusCode: 403, message: 'Identification invalide' });
    } else if (req.body.userId && req.body.userId !== userId) {
        res.json({ status: 'error', statusCode: 403, message: 'Identification invalide' });
    } else {
        next();
    }
};
