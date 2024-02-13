const ApiError = require('../../errors/apiError');
const { articleDataMapper, adminReferenceDataMapper, adminCommentDataMapper } = require('../../models/admin');
const { userDataMapper } = require('../../models/customer');
const { getUserId } = require('../../helpers/testUser');
const mailer = require('../../config/mailer');
const template = require('../../template/mail');

module.exports = {
    async getAll(_, res) {
        const articles = await articleDataMapper.findAll();
        res.json(articles);
    },
    async getOne(req, res) {
        const idArticle = Number(req.params.id);
        const article = await articleDataMapper.findOne(idArticle);
        return res.json(article);
    },
    async getFiltered(req, res) {
        const columns = [
            'id', 'number', 'origin', 'date_buy', 'available', 'archived',
            'id_booking', 'id_ref', 'ref_name', 'cat_id', 'cat_name'];
        const obj = req.body;
        const props = Object.keys(obj);
        const arr = [];
        props.forEach((prop) => {
            const value = obj[prop];
            const index = columns.indexOf(prop);
            if (Number.isNaN(index)) {
                throw new ApiError(400, `Impossible de chercher par cette propriété : ${prop} (non reconnue ou non implémentée)`);
            }
            if (['id', 'number', 'id_booking', 'id_ref', 'cat_id'].includes(columns[index]) && Number.isNaN(value)) {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : nombre)');
            }
            if (['archived', 'available'].includes(columns[index]) && typeof value !== 'boolean') {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : booléen)');
            }
            arr.push({ [columns[index]]: value });
        });
        const articles = await articleDataMapper.findFiltered(arr);
        if (articles.length < 1) {
            throw new ApiError(400, 'Nous n\'avons rien trouvé avec ces critères');
        }
        return res.json(articles);
    },
    async addArticle(req, res) {
        // je vérifie si la référence existe
        const reference = await adminReferenceDataMapper.findOne(req.body.id_ref);
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
    async updateArticle(req, res) {
        const id = [{ id: req.params.id }];
        const article = await articleDataMapper.findFiltered(id);
        if (article.length < 1) {
            throw new ApiError(404, 'Cet article n\'existe pas');
        }
        const updatedUser = await articleDataMapper.update(req.params.id, req.body);
        return res.json(updatedUser);
    },
    async getComment(req, res) {
        const id = Number(req.params.id);
        // test if article exist
        const article = await articleDataMapper.findFiltered([{ id }]);
        if (article.length < 1) {
            throw new ApiError(404, 'Cet article n\'existe pas');
        }

        const comments = await adminCommentDataMapper.findByArticle(id);
        return res.json(comments);
    },
    async getAllNoValidatedComment(req, res) {
        const comments = await adminCommentDataMapper.getNoValidated();
        return res.json(comments);
    },
    async addComment(req, res) {
        const id = Number(req.params.id);
        const id_user = getUserId(req);
        const { comment } = req.body;
        // test if article exist
        const article = await articleDataMapper.findFiltered([{ id }]);
        if (article.length < 1) {
            throw new ApiError(404, 'Cet article n\'existe pas');
        }
        // test if user exist
        const user = await userDataMapper.findById(id_user);
        if (user.length < 1) {
            throw new ApiError(404, 'Cet utilisateur n\'existe pas');
        }

        const newComment = await adminCommentDataMapper.addComment(id, id_user, comment);
        return res.json(newComment);
    },
    async deleteComment(req, res) {
        const id = Number(req.params.id);
        // test if comment exist
        const comment = await adminCommentDataMapper.getById(id);
        if (comment.length < 1) {
            throw new ApiError(404, 'Ce commentaire n\'existe pas');
        }

        const deleteComment = await adminCommentDataMapper.deleteComment(id);
        return res.json(deleteComment);
    },
    async validateComment(req, res) {
        const id = Number(req.params.id);
        // test if comment exist
        const comment = await adminCommentDataMapper.getById(id);
        if (comment.length < 1) {
            throw new ApiError(404, 'Ce commentaire n\'existe pas');
        }

        const validate = await adminCommentDataMapper.validateComment(id);
        return res.json(validate);
    },
    async update(req, res) {
        const id = [{ id: req.params.id }];
        const comment = await adminCommentDataMapper.getById(id);
        if (comment.length < 1) {
            throw new ApiError(404, 'Cette catégorie n\'existe pas');
        }
        const updatedCategory = await adminCommentDataMapper.update(req.params.id, req.body);
        return res.json(updatedCategory);
    },
    async userComment(req, res) {
        const { id } = req.params;
        const { message, type } = req.body;
        const commentResponse = await adminCommentDataMapper.getById(id);
        if (commentResponse.length) {
            const comment = commentResponse[0];
            if (type === 'valid') {
                await adminCommentDataMapper.validateComment(id);
                const article = await articleDataMapper.findOne(comment.id_article); // array
                const user = await userDataMapper.findById(comment.id_user); // not array
                const mail = template.validatedComment(article[0].number, user.first_name, message);

                mailer.send(user.email, mail.subject, mail.text);
                return res.status(200).json('commentaire validé');
            } if (type === 'delete') {
                await adminCommentDataMapper.deleteComment(id);
                const article = await articleDataMapper.findOne(comment.id_article); // array
                const user = await userDataMapper.findById(comment.id_user); // not array

                const mail = template.deletedComment(article[0].number, user.first_name, message);
                mailer.send(user.email, mail.subject, mail.text);
                return res.status(200).json('commentaire supprimé');
            }
            throw new ApiError(404, 'Mauvais type d\'action sur le commentaire');
        } else {
            throw new ApiError(404, 'Ce commentaire n\'existe pas');
        }
    },
    async getStatus(req, res) {
        const { articleId } = req.params;
        // test the article
        const article = await articleDataMapper.findOne(articleId);
        if (!article.length) return res.status(404).json('Article introuvable');
        // get the data of linked user if the article is booked
        const user = await articleDataMapper.getStatus(articleId);
        if (!user) {
            return res.json('Article disponible');
        }
        const response = `Chez ${user.first_name} ${user.last_name} N°${user.member_number}`;

        return res.json(response);
    },
};
