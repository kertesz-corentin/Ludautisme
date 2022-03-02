const bcrypt = require('bcrypt');

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
        const dbUser = await usersDatamapper.findFiltered(obj);
        if (!dbUser[0]) {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        }
        if (!bcrypt.compareSync(req.body.password, dbUser[0].password)) {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        }
        /* if (req.body.password !== dbUser[0].password) {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        } */

        if (dbUser[0].name === 'admin' && req.originalUrl !== '/api/login/admin') {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        } else if (dbUser[0].name === 'user' && req.originalUrl !== '/api/login/user') {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        } else {
            const token = jwt.sign(
                {
                    userId: dbUser[0].id,
                    role: dbUser[0].name,
                },
                process.env.SALT,
                { expiresIn: '24h' },
            );
            dbUser[0].token = token;
            const user = dbUser[0];
            res.status(200).json({ user });
        }
    },
};
