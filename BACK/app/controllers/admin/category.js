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
};
