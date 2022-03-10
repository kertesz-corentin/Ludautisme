const ApiError = require('../../errors/apiError');

const userReferenceDataMapper = require('../../models/customer/references');

module.exports = {
    async getAll(_, res) {
        const references = await userReferenceDataMapper.findAll();
        if (!references[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(references);
    },
    async getOne(req, res) {
        const references = await userReferenceDataMapper.findOne(req.params.id);
        if (!references[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(references);
    },
    async search(req, res) {
        const {
            page,
            nbRef,
            categories,
            tags,
            status,
        } = req.body;
        const offset = page * nbRef;
        const obj = {
            categories,
            tags,
            status,
        };
        const references = await userReferenceDataMapper.findFiltered(obj, offset, nbRef);
        if (!references[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(references);
    },
};
