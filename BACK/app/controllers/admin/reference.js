/* eslint-disable no-restricted-syntax */
const ApiError = require('../../errors/apiError');
const { referenceDataMapper, pictureDataMapper, articleDataMapper } = require('../../models/admin');

module.exports = {
    async getAll(req, res) {
        const results = await referenceDataMapper.findAll();
        if (!results) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getActive(req, res) {
        const results = await referenceDataMapper.findActive();
        if (!results) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getOne(req, res) {
        const results = await referenceDataMapper.findOne(req.params.id);
        if (!results[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async addRef(req, res) {
        const reference = await referenceDataMapper.findByName(req.body.name);
        if (reference.length > 0) {
            throw new ApiError(400, 'Une référence avec le même nom existe déjà');
        }
        const newRef = await referenceDataMapper.create(req.body);
        if (!newRef) {
            throw new ApiError(500, 'Impossible de créer la référence');
        }
        if (!req.body.picture) {
            req.body.picture = 6;
        }
        const picture = await pictureDataMapper.addRelation(newRef.id, req.body.picture);
        if (picture[0]) {
            throw new ApiError(500, 'Impossible d\'ajouter l\'image');
        }
        return res.json(newRef);
    },
    async update(req, res) {
        const reference = await referenceDataMapper.findOne(req.params.id);

        if (reference.length < 1) {
            throw new ApiError(404, 'Cet utilisateur n\'existe pas');
        }
        const updateRef = await referenceDataMapper.update(req.params.id, req.body);
        return res.json(updateRef);
    },
    async archived(req, res) {
        const refId = req.params.id;

        const arr = [{ id_ref: refId }];
        const articles = await articleDataMapper.findFiltered(arr);

        if (articles.length < 1) {
            throw new ApiError(404, 'Aucun article trouvé pour cette référence');
        }

        for (const article of articles) {
            const obj = { archived: true };
            // eslint-disable-next-line no-await-in-loop
            const response = await articleDataMapper.update(article.id, obj);
            if (response?.name === 'DatabaseError') {
                throw new ApiError(500, response?.message);
            }
        };

        const confirm = {
            message: 'Reference archivé avec succès',
        };
        return res.json(confirm);
    },
};
