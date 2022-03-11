const bcrypt = require('bcrypt');
const userDataMapper = require('../../models/customer/user');
const ApiError = require('../../errors/apiError');

const saltRounds = 10;

module.exports = {
    async getById(req, res) {
        const result = await userDataMapper.findById(req.params.id);
        return res.json(result);
    },
    async update(req, res) {
        const authorizedFields = [
            'email',
            'member_number',
            'phone',
            'first_name',
            'last_name',
            'adress_number',
            'adress_street',
            'adress_zipcode',
            'adress_city',
            'password',
        ];
        Object.keys(req.body).forEach((prop) => {
            if (!authorizedFields.includes(prop)) {
                throw new ApiError(403, 'Vous ne pouvez pas modifier ce champ');
            }
        });
        const user = await userDataMapper.findById(req.params.id);

        if (user.length < 1) {
            throw new ApiError(404, 'Cet utilisateur n\'existe pas');
        }
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        }
        const updatedUser = await userDataMapper.update(req.params.id, req.body);
        return res.json(updatedUser);
    },
};
