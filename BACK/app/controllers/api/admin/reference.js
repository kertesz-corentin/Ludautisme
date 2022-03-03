const ApiError = require('../../../errors/apiError');
const referencesDataMapper = require('../../../models/admin/reference');

module.exports = {
    async getAll(req, res) {
        const results = await referencesDataMapper.findAll();
        return res.json(results);
    },

};
