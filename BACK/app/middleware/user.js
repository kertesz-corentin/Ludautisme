const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log("token",token);
    if (!token) {
        res.json({ status: 'error', statusCode: 403, message: 'Identification invalide' });
    }
    const decodedToken = jwt.verify(token, process.env.SALT);
    const { userId } = decodedToken;
    console.log("userId",userId);
    if (req.body.userId && req.body.userId !== userId) {
        res.json({ status: 'error', statusCode: 403, message: 'Identification invalide' });
    } else {
        next();
    }
};
