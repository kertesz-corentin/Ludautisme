const ApiError = require('../../../errors/apiError');
const articleDataMapper = require('../../../models/admin/article');

module.exports = {
    async getAll(_, res) {
        const articles = await articleDataMapper.findAll();
        res.json(articles);
    },
};
