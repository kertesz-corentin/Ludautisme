const usersDataMapper = require('../../../models/admin/users');
const { ApiError } = require('../../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const users = await usersDataMapper.findAll();
        return res.json(users);
    }
}


