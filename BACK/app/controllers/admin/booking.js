/* eslint-disable max-len */
const ApiError = require('../../errors/apiError');
const {
    bookingDataMapper, permanencyDataMapper, articleDataMapper, usersDataMapper,
} = require('../../models/admin');

module.exports = {
    async getAll(_, res) {
        const booking = await bookingDataMapper.findAll();
        res.json(booking);
    },

    async getFiltered(req, res) {
        // Avoid injection on column
        const columns = [
            'id', 'delivered', 'closed',
            'id_permanency', 'date_permanency', 'active_permanency',
            'id_user', 'email', 'first_name', 'last_name', 'member_number'];
        const obj = req.body;
        const props = Object.keys(obj);
        const arr = [];
        props.forEach((prop) => {
            const value = obj[prop];
            const index = columns.indexOf(prop);
            if (Number.isNaN(index)) {
                throw new ApiError(400, `Impossible de chercher par cette propriété : ${prop} (non reconnue ou non implémentée)`);
            }
            if (['id', 'member_number', 'id_user'].includes(columns[index]) && Number.isNaN(value)) {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : nombre)');
            }
            if (['archived'].includes(columns[index]) && typeof value !== 'boolean') {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : booléen)');
            }
            arr.push({ [columns[index]]: value });
        });
        const user = await bookingDataMapper.findFiltered(arr);
        if (user.length < 1) {
            throw new ApiError(400, 'Nous n\'avons rien trouvé avec ces critères');
        }
        return res.json(user);
    },
    async getOne(req, res) {
        const idUser = Number(req.params.id);
        const booking = await bookingDataMapper.findOne(idUser);
        return res.json(booking);
    },

    async addBookingByRef(req, res) {
        const userId = Number(req.params.UserId);
        const { refIds } = req.body;

        // Check if too much articles are booked
        if (!refIds || refIds.length > 7) {
            throw new ApiError(400, 'La réservation ne peut pas être vide ou comporter plus de 8 articles');
        }

        // Check if user exist
        const user = await usersDataMapper.findById(userId);
        if (user.length !== 1) {
            throw new ApiError(400, 'Cet utilisateur n\'existe pas');
        }

        //  Get active perm id and next perm id
        const activePerm = await permanencyDataMapper.findActive();
        //  Check exisiting booking for this permanency
        const getCurrentParams = [
            { id_permanency: activePerm[0].next_id },
            { id_user: userId },
        ];
        const bookingExist = await bookingDataMapper.findFiltered(getCurrentParams);
        if (bookingExist.length > 0) {
            throw new ApiError(400, 'Cet utilisateur à déjà une réservation pour cette permanence');
        }

        // Check if articles are available
        const refAvailability = await bookingDataMapper.getRefsAvailability(refIds);
        if (refAvailability.length !== refIds.length) {
            const unknownRef = refIds.filter((refId) => !refAvailability.map((ref) => ref.id).includes(refId));
            throw new ApiError(400, `Référence(s) inconnues : [ ${unknownRef} ]`);
        }
        if (!refAvailability.every((ref) => ref.article_available)) {
            const unavailableRef = refAvailability.filter((ref) => ref.article_available === false);
            const errorString = unavailableRef.map((ref) => `[ ${ref.id} ${ref.name} ]`);
            throw new ApiError(400, `Ce ou ces articles sont indisponibles : ${errorString}`);
        }
        try {
            const newBooking = {
                id_permanency: activePerm[0].next_id,
                id_user: userId,
            };
            // Add booking to get an id booking
            const newBookingConfirm = await bookingDataMapper.addOne(newBooking);
            // Join articles to booking
            const articlesIds = refAvailability.map((ref) => ref.article_id);
            const articlesBooked = await bookingDataMapper.addArticlesToBooking(newBookingConfirm.id, articlesIds);
            // Update availability on each article booked to false
            await bookingDataMapper.updateArticlesAvailability(articlesIds);
            return res.json({ newBookingConfirm, articlesBooked });
        } catch (err) {
            res.json(err);
        }
    },
    async addBookingByArticle(req, res) {
        const userId = Number(req.params.UserId);
        const { artIds } = req.body;
        // Check if too much articles are booked
        if (!artIds || artIds.length > 7) {
            throw new ApiError(400, 'La réservation ne peut pas être vide ou comporter plus de 8 articles');
        }

        // Check if user exist
        const user = await usersDataMapper.findById(userId);
        if (user.length !== 1) {
            throw new ApiError(400, 'Cet utilisateur n\'existe pas');
        }

        //  Get active perm id and next perm id
        const activePerm = await permanencyDataMapper.findActive();
        //  Check exisiting booking for this permanency
        const getCurrentParams = [
            { id_permanency: activePerm[0].next_id },
            { id_user: userId },
        ];
        const bookingExist = await bookingDataMapper.findFiltered(getCurrentParams);
        if (bookingExist.length > 0) {
            throw new ApiError(400, 'Cet utilisateur à déjà une réservation pour cette permanence');
        }

        // Check if articles are available
        const artAvailability = await bookingDataMapper.getArticlesAvailability(artIds);
        if (artAvailability.length !== artIds.length) {
            const unknownRef = artIds.filter((artId) => !artAvailability.map((art) => art.id).includes(artId));
            throw new ApiError(400, `Référence(s) inconnues : [ ${unknownRef} ]`);
        }
        if (!artAvailability.every((art) => art.available)) {
            const unavailableArt = artAvailability.filter((art) => !art.available);
            const errorString = unavailableArt.map((art) => `[ ${art.id}]`);
            throw new ApiError(400, `Ce ou ces articles sont indisponibles : ${errorString}`);
        }

        try {
            const newBooking = {
                id_permanency: activePerm[0].next_id,
                id_user: userId,
            };
            // Add booking to get an id booking
            const newBookingConfirm = await bookingDataMapper.addOne(newBooking);
            // Join articles to booking
            const articlesBooked = await bookingDataMapper.addArticlesToBooking(newBookingConfirm.id, artIds);
            // Update availability on each article booked to false
            await bookingDataMapper.updateArticlesAvailability(artIds);
            return res.json({ newBookingConfirm, articlesBooked });
        } catch (err) {
            res.json(err);
        }
    },
    async addToBooking(req, res) {
        const userId = Number(req.params.id);
        const { articleNumber } = req.body;

        if (!articleNumber) {
            throw new ApiError(400, 'La réservation ne peut pas être vide');
        }

        // Check if user exist
        const user = await usersDataMapper.findById(userId);
        if (user[0].name === 'DatabaseError') {
            throw new ApiError(400, 'Cet utilisateur n\'existe pas');
        }
        const activePerm = await permanencyDataMapper.findActive();

        const getCurrentParams = [
            { id_permanency: activePerm[0].next_id },
            { id_user: userId },
        ];
        //  Check exisiting booking for this permanency
        const bookingExist = await bookingDataMapper.findFiltered(getCurrentParams);
        if (bookingExist.length !== 1) {
            throw new ApiError(400, 'Cet utilisateur n\'as pas de réservation ou en a trop');
        }
        const article = await articleDataMapper.getArticleAvaibility(articleNumber);
        if (!article) {
            throw new ApiError(400, 'Cet article n\'existe pas');
        }
        if (article.returned === false) {
            throw new ApiError(400, 'Cet article est dans une réservation');
        } else if (article.archived === true) {
            throw new ApiError(400, 'Cet article est archivé');
        } else if (article.available === false) {
            throw new ApiError(400, 'Cet article n\'est pas disponible');
        }
        const newArticle = [article.id];
        const newArticleBooking = await bookingDataMapper.addArticlesToBooking(bookingExist[0].id, newArticle);
        if (newArticleBooking.name === 'DatabaseError') {
            throw new ApiError(500, 'Echec de la création de la réservation');
        }
        await bookingDataMapper.updateArticlesAvailability(newArticle);
        const confirm = {
            article: articleNumber,
            reservation: bookingExist[0].id,
            message: 'Article ajouté',
        };
        return res.json(confirm);
    },
    async removeToBooking(req, res) {
        const articleId = Number(req.params.id);
        if (!articleId) {
            throw new ApiError(400, 'Cet article n\'existe pas');
        }
        const oldBooking = await bookingDataMapper.deleteArticle(articleId);
        if (!oldBooking[0]) {
            throw new ApiError(404, 'L\'article n\'est dans aucune réservation');
        }
        const obj = { available: true };
        await articleDataMapper.update(articleId, obj);
        const confirm = {
            article: articleId,
            reservation: oldBooking[0].id_booking,
            message: 'Article retiré',
        };
        return res.json(confirm);
    },
    async returnArticle(req, res) {
        const { id } = req.params;

        const returnArticle = await bookingDataMapper.return([id]);

        if (!returnArticle[0]) {
            throw new ApiError(404, 'L\'article n\'est dans aucune réservation');
        }
        const obj = { available: true };
        const availableArticle = await articleDataMapper.update(id, obj);

        if (!availableArticle) {
            throw new ApiError(404, 'L\'article n\'existe pas');
        }
        const confirm = {
            article: returnArticle[0].id_article,
            reservation: returnArticle[0].id_booking,
            message: 'Article rendu',
        };
        return res.json(confirm);
    },
    async close(req, res) {
        const { id } = req.params;
        // I take the booking
        const booking = await bookingDataMapper.findOne(id);
        // If booking not exist error
        if (!booking[0]) {
            throw new ApiError(404, `La réservation n°${id} n'existe pas`);
        }
        const listArticle = [];
        // I take each article noy returned for this booking
        booking[0].borrowed_articles.forEach(async (article) => {
            if (article.available === false) {
                listArticle.push(article.id);
            }
        });
        // If has article in the listArticle
        if (listArticle[0]) {
            // I write this article is returned in dynamic table
            const returned = await bookingDataMapper.return(listArticle);
            returned.forEach((article) => {
                if (article.returned !== true) {
                    throw new ApiError(500, `Impossible de marquer l\'article n°${article.id} comme retourné`);
                }
            });
            // And i make the article available
            const getAvailable = await articleDataMapper.return(listArticle);
            getAvailable.forEach((article) => {
                if (article.available !== true) {
                    throw new ApiError(500, `Impossible de marquer l\'article n°${article.id} comme disponible`);
                }
            });
        }
        // And i close the booking
        const closedBooking = await bookingDataMapper.close(id);
        if (closedBooking[0].closed !== true) {
            throw new ApiError(500, 'Impossible de cloturer la réservation');
        }
        const confirm = {
            articles: listArticle,
            reservation: id,
            message: 'Réservation cloturé avec succés',
        };
        return res.json(confirm);
    },
    async deliver(req, res) {
        const { id } = req.params;

        const deliver = await bookingDataMapper.deliver(id);
        if (!deliver[0]) {
            throw new ApiError(404, 'Impossible de trouver cette reservation');
        }
        return res.json(deliver);
    },
};
