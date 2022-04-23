const { categoryDataMapper } = require('../../models/customer');
const ApiError = require('../../errors/apiError');

module.exports = {
    async getAll(req, res) {
        const results = await categoryDataMapper.findAll();
        return res.json(results);
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
        const category = await categoryDataMapper.findFiltered(arr);
        if (category.length < 1) {
            throw new ApiError(400, 'Nous n\'avons rien trouvé avec ces critères');
        }
        return res.json(category);
    },
};
