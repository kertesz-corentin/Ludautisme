const ApiError = require('../../../errors/apiError');
const referencesDataMapper = require('../../../models/admin/reference');
const articleDataMapper = require('../../../models/admin/article');
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
    async addArticle(req, res) {
        // je vérifie si la référence existe
        const reference = await referencesDataMapper.findOne(req.body.id_ref);
        if (reference.length < 1) {
            throw new ApiError(404, 'La référence parent n\'existe pas');
        }
        const article = await articleDataMapper.findByCode(req.body.number);
        if (article.length > 0) {
            throw new ApiError(400, 'Un article avec le même numéro existe déjà');
        }
        const newArticle = await articleDataMapper.create(req.body);

        return res.json(newArticle);
    },
};
