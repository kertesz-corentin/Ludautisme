const jwt = require('jsonwebtoken');
require('dotenv').config();

// eslint-disable-next-line consistent-return
module.exports = (req) => {
    const token = req.headers['x-access-token'];
    const decodedToken = (token) && jwt.verify(token, process.env.SALT);
    return (decodedToken) ? Number(decodedToken.userId) : undefined;
};
