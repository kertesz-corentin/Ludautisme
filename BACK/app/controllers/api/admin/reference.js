const ApiError = require('../../../errors/apiError');
const referencesDataMapper = require('../../../models/admin/reference');

module.exports = {
    async getAll(req, res) {
        const results = await referencesDataMapper.findAll();
        if (!results) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getActive(req, res) {
        const results = await referencesDataMapper.findActive();
        if (!results) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getOne(req, res) {
        const results = await referencesDataMapper.findOne(req.params.id);
        if (!results[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results[0]);
    },
};
