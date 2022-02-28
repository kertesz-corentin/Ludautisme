// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const loginDataMapper = require('../../../models/admin/login');
//  Enable it when Post, update...
const { ApiError } = require('../../../helpers/errorHandler');

module.exports = {
    async login(req, res) {
        const user = {
            id: 1,
            email: 'corentin@grr.la',
            member_number: 121,
            phone: '0761916300',
            first_name: 'corentin',
            last_name: 'kertesz',
            adress_number: '4',
            adress_street: 'rue dieudonné costes',
            adress_zipcode: 29200,
            adress_city: 'brest',
            password: 'productowner',
            cotisation_status: false,
            cotisation_expiration: null,
            caution_status: false,
            caution_expiration: null,
            archived: false,
            id_role: 2,
            created_at: '2022-02-28T13:22:01.070Z',
        };
        if (req.body.email !== user.email) {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        }
        if (req.body.password !== user.password) {
            throw new ApiError(404, 'L\'email ou le mot de passe utilisé est invalide');
        } else {
            const token = jwt.sign(
                { userId: user.id },
                process.env.SALT,
                { expiresIn: '24h' },
            );
            user.token = token;
            res.status(200).json({ user });
        }
    },
};
