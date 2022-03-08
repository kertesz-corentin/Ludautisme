const ApiError = require('../../errors/apiError');

const { categoryDataMapper } = require('../../models/admin');

module.exports = {
    async getAll(req, res) {
        const results = await categoryDataMapper.getAll();
        return res.json(results);
    },
    async addCategorie(req, res) {
        const results = await categoryDataMapper.create();
    },
};
