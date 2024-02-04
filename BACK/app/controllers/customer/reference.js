const ApiError = require('../../errors/apiError');
const userIdToken = require('../../helpers/userIdToken');
const userReferenceDataMapper = require('../../models/customer/references');
const commentDataMapper = require('../../models/customer/comment');
const { getUserId } = require('../../helpers/testUser');
const { articleDataMapper, usersDataMapper } = require('../../models/admin');
const mailer = require('../../config/mailer');
const template = require('../../template/mail');

module.exports = {
    async getAll(_, res) {
        const references = await userReferenceDataMapper.findAll();
        if (!references[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(references);
    },
    async getNameList(_, res) {
        const references = await userReferenceDataMapper.findNameList();
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
    async getOneByArticleNumber(req, res) {
        const results = await userReferenceDataMapper.findByArticleNumber(req.params.number);
        if (!results[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }

        const total = await userReferenceDataMapper.findCountResult(req.params.number);
        if (!total[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        const refWithCount = results.map((ref) => ({ ...ref, countresult: total[0].nb_total }));
        return res.json(refWithCount);
    },
    async search(req, res) {
        // Get userId to check favorite
        const userId = [userIdToken(req)];
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
        const columns = ['categories', 'tags', 'available', 'id', 'favorite'];
        const aliases = ['cat.id', 'category.id', 'ar.available', 'r.id', 'fav.id_user'];

        // I take the arguments in body
        if (!req.body.tags.length) {
            delete req.body.tags;
        }
        if (!req.body.categories.length) {
            delete req.body.categories;
        }
        if (req.body.available[0] === undefined || req.body.available[0] === '') {
            delete req.body.available;
        }

        if (!req.body.id.length) {
            delete req.body.id;
        }
        // Add user id if exist
        if (req.body.favorite) {
            req.body.favorite = [userIdToken(req)];
        } else {
            delete req.body.favorite;
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
                if (['categories', 'tags', 'id', 'favorite'].includes(columns[index]) && typeof value !== 'number') {
                    throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : nombre)');
                }
                if (['available'].includes(columns[index]) && typeof value !== 'boolean') {
                    throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : booléen)');
                }
                values.push(value);
            });
            arr.push({ [aliases[index]]: values });
        });

        const references = await userReferenceDataMapper.findFiltered(arr, offset, limit, userId);
        const total = await userReferenceDataMapper.findCountResultByArticle(arr);
        const refWithCount = references.map((ref) => ({ ...ref, countresult: total[0].nb_total }));
        return res.json(refWithCount);
    },
    async addOneComment(req, res) {
        // id == article id
        const id = Number(req.params.id);
        const id_user = getUserId(req);
        const { comment } = req.body;
        // test if article exist
        const article = await articleDataMapper.findFiltered([{ id }]);
        if (article.length < 1) {
            throw new ApiError(404, 'Cet article n\'existe pas');
        }
        // test if user exist
        const user = await usersDataMapper.findById(id_user);
        if (user.length < 1) {
            throw new ApiError(404, 'Cet utilisateur n\'existe pas');
        }

        const reference = await userReferenceDataMapper.findByArticleNumber(article[0].number);
        if (!reference[0]) {
            throw new ApiError(404, 'Impossible de retrouver la reference');
        }

        const newComment = await commentDataMapper.addComment(id, id_user, comment);

        // send email to admin
        const mail = template.newUserComment(comment, reference[0].name, article[0].number);
        mailer.send(process.env.MAIL_TARGET, mail.subject, mail.text);
        return res.json(newComment);
    },
};
