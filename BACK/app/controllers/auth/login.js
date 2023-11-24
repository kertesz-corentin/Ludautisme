const bcrypt = require('bcrypt');

const saltRounds = 10;

const jwt = require('jsonwebtoken');
const mailer = require('../../config/mailer');
const template = require('../../template/mail');
require('dotenv').config();

const loginDatamapper = require('../../models/auth/login');
const { usersDataMapper } = require('../../models/admin');
const ApiError = require('../../errors/apiError');
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
 * @typedef {object} paramForgotPwd
 * @property {string} email - user email
 */
/**
 * @typedef {object} paramResetPwd
 * @property {string} request.param.token.required token - temp token
 */

module.exports = {
    async login(req, res) {
        const obj = [{ email: req.body.email }];
        // I verify if user exist with this mail
        const dbUser = await usersDataMapper.findFiltered(obj);
        if (!dbUser[0]) {
            throw new ApiError(403, 'L\'email ou le mot de passe utilisé est invalide');
        }
        // I verify if the password is good
        if (!bcrypt.compareSync(req.body.password, dbUser[0].password)) {
            throw new ApiError(403, 'L\'email ou le mot de passe utilisé est invalide');
        }
        // And i verify if thy way is correct
        if (dbUser[0].name === 'admin' && req.originalUrl !== '/api/login/admin') {
            dbUser[0].name = 'user';
        }
        if (dbUser[0].name === 'user' && req.originalUrl !== '/api/login/user') {
            throw new ApiError(403, 'L\'email ou le mot de passe utilisé est invalide');
        } else {
        // If everything is good I create the token
            const token = jwt.sign(
                {
                    userId: dbUser[0].id,
                    role: dbUser[0].name,
                },
                process.env.SALT,
                { expiresIn: '31d' },
            );
            const loggedUser = {
                id: dbUser[0].id,
                token,
                role: dbUser[0].name,
            };
            res.status(200).json(loggedUser);
        }
    },
    async forgotPassword(req, res) {
        const user = await loginDatamapper.getUserWithToken(req.body.email);
        if (!user) {
            res.status(500).json('Cette adresse email ne corresponds a aucun contact');
            return;
        }
        if (user.temptoken) {
            await loginDatamapper.resetUserTempToken(req.body.email);
        }
        const token = jwt.sign(
            {
                email: user.email,
            },
            process.env.SALT,
            { expiresIn: '1h' },
        );
        const dbTempToken = await loginDatamapper.addToken(req.body.email, token);
        const link = `${req.body.url}/resetpassword/${dbTempToken.temptoken}`;
        const mailTemplate = template.sendPasswordRecovery(user.first_name, link);
        mailer.send(req.body.email, mailTemplate.subject, mailTemplate.text);
        res.json({ status: 'ok' });
    },
    async resetPassword(req, res) {
        // FRONT : Read query token and pass it to back
        const { token, password } = req.body;
        if (!token || !password) {
            res.json({ status: 'pas de token ou pas de mot de passe' });
            return;
        }
        const decodedToken = jwt.verify(token, process.env.SALT);
        const obj = [{ email: decodedToken.email }];
        const dbUser = await usersDataMapper.findFiltered(obj);
        if (!dbUser) {
            res.json({ status: 'cet utilisateur nexiste pas' });
            return;
        }

        req.params.id = dbUser[0].id;
        delete req.body.token;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;
        const updatedUser = await usersDataMapper.update(req.params.id, req.body);
        res.json(updatedUser);
    },
};
