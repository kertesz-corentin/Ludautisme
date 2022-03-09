const ApiError = require('../../errors/apiError');

const { categoryDataMapper } = require('../../models/admin');

module.exports = {
    async getAll(req, res) {
        const results = await categoryDataMapper.getAll();
        return res.json(results);
    },
    async addCategorie(req, res) {
        const arr = [{ name: req.body.name }];
        const category = await categoryDataMapper.findFiltered(arr);
        if (category.length > 0) {
            throw new ApiError(400, 'Une catégorie avec le même nom existe déjà');
        }
        const newCategory = await categoryDataMapper.create(req.body);
        return res.json(newCategory);
    },
    async findFiltered(req, res) {
        const columns = ['id', 'name', 'description', 'main'];
        const obj = req.body;
        const props = Object.keys(obj);
        const arr = [];
        props.forEach((prop) => {
            const value = obj[prop];
            const index = columns.indexOf(prop);
            if (Number.isNaN(index)) {
                throw new ApiError(400, 'Impossible de chercher par cette propriété (non reconnue ou non implémentée)');
            }
            if (['id'].includes(columns[index]) && typeof value !== 'number') {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : nombre)');
            }
            if (['main'].includes(columns[index]) && typeof value !== 'boolean') {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : booléen)');
            }
            arr.push({ [columns[index]]: value });
        });
        console.log(arr);
        const category = await categoryDataMapper.findFiltered(arr);
        if (category.length < 1) {
            throw new ApiError(400, 'Nous n\'avons rien trouvé avec ces critères');
        }
        return res.json(category);
    },
};
