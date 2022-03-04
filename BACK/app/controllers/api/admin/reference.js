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
    async addRef(req, res) {
        const reference = await referencesDataMapper.findByName(req.body.name);
        if (reference.length > 0) {
            throw new ApiError(400, 'Une référence avec le même nom existe déjà');
        }
        const newRef = await referencesDataMapper.create(req.body);
        return res.json(newRef);
    },
    async update(req, res) {
        const reference = await referencesDataMapper.findOne(req.params.id);

        if (reference.length < 1) {
            throw new ApiError(404, 'Cet utilisateur n\'existe pas');
        }
        const updateRef = await referencesDataMapper.update(req.params.id, req.body);
        return res.json(updateRef);
    },
};
