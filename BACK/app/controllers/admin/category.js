const ApiError = require('../../errors/apiError');

const { categoryDataMapper, adminReferenceDataMapper } = require('../../models/admin');

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
        const category = await categoryDataMapper.findFiltered(arr);
        if (category.length < 1) {
            throw new ApiError(400, 'Nous n\'avons rien trouvé avec ces critères');
        }
        return res.json(category);
    },
    async update(req, res) {
        const id = [{ id: req.params.id }];
        const user = await categoryDataMapper.findFiltered(id);
        if (user.length < 1) {
            throw new ApiError(404, 'Cette catégorie n\'existe pas');
        }
        const updatedCategory = await categoryDataMapper.update(req.params.id, req.body);
        return res.json(updatedCategory);
    },
    async delete(req, res) {
        const { id } = req.params;
        const arr = [{ id: Number(id) }];
        const category = await categoryDataMapper.findFiltered(arr);
        if (!category.length) {
            throw new ApiError(404, 'La catégorie n\'a pas été trouvé, rien n\'a été supprimé');
        }
        // if category is main update his ref to "without category"
        if (category[0].main) {
            // TODO récupérer tout les référence dans la catégorie en question
            const arrMain = [{ main_category: [category[0].id] }];
            const referencesInCategory = await adminReferenceDataMapper.findFiltered(arrMain);

            referencesInCategory.forEach(async (r) => {
                const options = {
                    main_category: 23,
                };
                await adminReferenceDataMapper.update(r.id, options);
            });
        }
        // !! interdire la suppréssion de la categorie "sans catégorie"
        if (category.id === 23) {
            throw new ApiError(401, 'Interdiction de supprimmer la catégorie "sans catégorie');
        }
        const deletedCategory = await categoryDataMapper.delete(id);
        if (!deletedCategory) {
            throw new ApiError(404, 'La catégorie n\'a pas été trouvé, rien n\'a été supprimé');
        }
        return res.json(deletedCategory);
    },
};
