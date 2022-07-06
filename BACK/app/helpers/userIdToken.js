const jwt = require('jsonwebtoken');
require('dotenv').config();

// eslint-disable-next-line consistent-return
module.exports = (req) => {
    const token = req.headers['x-access-token'];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SALT);
    const userId = (decodedToken) ? decodedToken.userId : undefined;
    return userId;
};
