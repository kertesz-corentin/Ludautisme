const jwt = require('jsonwebtoken');
require('dotenv').config();

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
    if (!req.headers['x-access-token']) {
        return res.json({ status: 'error', statusCode: 403, message: 'Pas de token' });
    }
    const token = req.headers['x-access-token'];
    const decodedToken = jwt.verify(token, process.env.SALT);
    const { userId, role } = decodedToken;
    if (role !== 'admin') {
        res.json({ status: 'error', statusCode: 403, message: 'Identification invalide1' });
    } else if (req.body.userId && req.body.userId !== userId) {
        res.json({ status: 'error', statusCode: 403, message: 'Identification invalide2' });
    } else {
        next();
    }
};
