const { categoryDataMapper } = require('../../models/customer');
const ApiError = require('../../errors/apiError');

module.exports = {
    async getAll(req, res) {
        const results = await categoryDataMapper.findAll();
        return res.json(results);
    },
};
