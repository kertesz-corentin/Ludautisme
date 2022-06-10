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
        // I get the page and the reference number per page and I calculate the offset
        const {
            page,
            limit,
        } = req.body;
        if (typeof page !== 'number' || typeof page !== 'number') {
            throw new ApiError(400, 'Page ou limite invalide (attendu: nombre)');
        }

        const offset = (page * limit) - limit;
        // I clean req.body before while
        delete req.body.page;
        delete req.body.limit;
        // I create the list of valid arguments
        const columns = ['categories', 'tags', 'available', 'id'];
        const aliases = ['cat.id', 'category.id', 'ar.available'];

        // I take the arguments in body
        if (!req.body.tags[0]) {
            delete req.body.tags;
        }
        if (!req.body.categories[0]) {
            delete req.body.categories;
        }
        if (req.body.available[0] === undefined || req.body.available[0] === '') {
            delete req.body.available;
        }
        const obj = req.body;
        const props = Object.keys(obj);
        const arr = [];
        props.forEach((prop) => {
            if (!columns.includes(prop)) {
                throw new ApiError(400, `${prop} n'est pas une propriété valide`);
            }
            const array = obj[prop];
            const index = columns.indexOf(prop);
            const values = [];
            array.forEach((value) => {
                if (['categories', 'tags', 'id'].includes(columns[index]) && typeof value !== 'number') {
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
        const total = await userReferenceDataMapper.findCountResult(arr);
        const response = {
            data: references,
            total: total[0],
        };

        return res.json(response);
    },
};
