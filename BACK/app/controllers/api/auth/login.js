const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersDatamapper = require('../../../models/admin/users');
const { ApiError } = require('../../../helpers/errorHandler');
/**
 * @typedef {object} login
 * @property {string} id - Unique identifier
 * @property {string} token - JSON web token
 */
/**
 * @typedef {object} paramLogin
 * @property {string} email - user email
 * @property {string} password -user password
 */
/**
 * @typedef {object} paramResetPwd
 * @property {string} email - user email
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
            const loggedUser = {
                id: dbUser[0].id,
                token,
            };
            res.status(200).json(loggedUser);
        }
    },
    async resetPassword(req, res) {
        let user = await usersDatamapper.findFiltered([{ email: req.body.email }]);
        if (user.length !== 1) {
            return res.json({ status: 'ok' });
        }
        user = user[0];
        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.SALT,
            { expiresIn: '1h' },
        );

    //Create token
    //and stock
    //Send email
    res.json(user);
}
};
