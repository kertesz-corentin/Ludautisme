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
            limit,
        } = req.body;
        const offset = (page * limit) - 10;
        const columns = ['categories', 'tags', 'available'];
        const aliases = ['cat.id', 'category.id', 'ar.available'];
        delete req.body.page;
        delete req.body.limit;
        const obj = req.body;
        const props = Object.keys(obj);

        const arr = [];
        props.forEach((prop) => {
            const array = obj[prop];
            const index = columns.indexOf(prop);
            const values = [];
            array.forEach((value) => {
                if (Number.isNaN(index)) {
                    throw new ApiError(400, 'Impossible de chercher par cette propriété (non reconnue ou non implémentée)');
                }
                if (['categories', 'tags'].includes(columns[index]) && typeof value !== 'number') {
                    throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : nombre)');
                }
                if (['available'].includes(columns[index]) && typeof value !== 'boolean') {
                    throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : booléen)');
                }
                values.push(value);
            });
            arr.push({ [aliases[index]]: values });
        });
        const references = await userReferenceDataMapper.findFiltered(arr, offset, limit);
        if (!references[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(references);
    },
};
