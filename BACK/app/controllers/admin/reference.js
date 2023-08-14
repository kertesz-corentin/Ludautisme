/* eslint-disable no-restricted-syntax */
const ApiError = require('../../errors/apiError');
const {
    adminReferenceDataMapper, pictureDataMapper, articleDataMapper, categoryDataMapper,
} = require('../../models/admin');

module.exports = {
    async getAll(req, res) {
        const results = await adminReferenceDataMapper.findAll();
        if (!results) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getActive(req, res) {
        const results = await adminReferenceDataMapper.findActive();
        if (!results) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getOne(req, res) {
        const results = await adminReferenceDataMapper.findOne(req.params.id);
        if (!results[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getOneByArticleNumber(req, res) {
        const results = await adminReferenceDataMapper.findByArticleNumber(req.params.number);
        if (!results[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async addRef(req, res) {
        const reference = await adminReferenceDataMapper.findByName(req.body.name);
        if (reference.length > 0) {
            throw new ApiError(400, 'Une référence avec le même nom existe déjà');
        }
        const newRef = await adminReferenceDataMapper.create(req.body);
        if (!newRef) {
            throw new ApiError(500, 'Impossible de créer la référence');
        }
        // if (!req.body.picture) {
        //     req.body.picture = 6;
        // }
        if (req.body.picture) {
            const picture = await pictureDataMapper.addRelation(newRef.id, req.body.picture);
            if (picture[0]) {
                throw new ApiError(500, 'Impossible d\'ajouter l\'image');
            }
        }
        return res.json(newRef);
    },
    async update(req, res) {
        const reference = await adminReferenceDataMapper.findOne(req.params.id);
        if (reference.length < 1) {
            throw new ApiError(404, "Cette référence n'existe pas");
        }
        // comparer les tags du formulaire et ceux de la BDD
        const existingTags = reference[0].tag.map((t) => String(t.id));
        let tags = [];
        if (req.body.tags !== '') tags = req.body.tags.split(',');

        const promiseArrayAdd = [];
        const promiseArrayDelete = [];
        // si il n'y pas de tags dans la base de données ajouter les tags sur la référence
        if (!existingTags.length && tags?.length) {
            for (const tag of tags) {
                const promise = new Promise(() => {
                    categoryDataMapper.joinTagToRef(tag, reference.id);
                });
                promiseArrayAdd.push(promise);
            }
        } else {
            if (existingTags.length) {
                /* comparer si un tags existant n'est pas dans la liste depuis le
                formulaire supprimer la relation */
                for (const tag of existingTags) {
                    if (!tags.includes(tag)) {
                        const promise = new Promise(() => {
                            categoryDataMapper.deleteTagFromRef(tag, reference[0].id);
                        });
                        promiseArrayDelete.push(promise);
                    }
                }
            }
            if (tags.length) {
                /* comparer si un tag est dans le formulaire mais pas dans la
                BDD créer la relation */
                for (const tag of tags) {
                    if (!existingTags.includes(tag)) {
                        const promise = new Promise(() => {
                            categoryDataMapper.joinTagToRef(tag, reference[0].id);
                        });
                        promiseArrayAdd.push(promise);
                    }
                }
            }
        }
        if (promiseArrayAdd.length) {
            await Promise.all(promiseArrayAdd);
        }
        if (promiseArrayDelete.length) {
            await Promise.all(promiseArrayDelete);
        }

        const ref = {
            name: req.body.name,
            description: req.body.description,
            valorisation: req.body.valorisation,
            main_category: req.body.main_category,
        };
        const updateRef = await adminReferenceDataMapper.update(req.params.id, ref);
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
        }

        const confirm = {
            message: 'Reference archivé avec succès',
        };
        return res.json(confirm);
    },
};
