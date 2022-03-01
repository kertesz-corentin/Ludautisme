// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersDatamapper = require('../../../models/admin/users');
const { ApiError } = require('../../../helpers/errorHandler');

/**
 * @typedef {object} token
 * @property {string} token - JSON web token
 */
/**
 * @typedef {object} paramLogin
 * @property {string} email - user email
 * @property {string} password -user password
 */
module.exports = {
    async login(req, res) {
        const obj = [{ email: req.body.email }];
        const user = await usersDatamapper.findFiltered(obj);
        if (!user[0]) {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        }
        if (req.body.password !== user[0].password) {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        }
        if (user[0].name === 'admin' && req.originalUrl !== '/api/admin/login') {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        } else if (user[0].name === 'user' && req.originalUrl !== '/api/user/login') {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        } else {
            const token = jwt.sign(
                {
                    userId: user[0].id,
                    role: user[0].name,
                },
                process.env.SALT,
                { expiresIn: '24h' },
            );
            user[0].token = token;
            res.status(200).json({ user });
        }
    },
};
