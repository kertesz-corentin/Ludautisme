/* eslint-disable max-len */
const ApiError = require('../../errors/apiError');
const {
    bookingDataMapper, permanencyDataMapper, articleDataMapper, usersDataMapper,
} = require('../../models/admin');
const { userBookingDataMapper } = require('../../models/customer');

module.exports = {
    async getAll(_, res) {
        const booking = await bookingDataMapper.findAll();
        res.json(booking);
    },

    async twoYearsBooking(_, res) {
        const booking = await bookingDataMapper.findTwoYearsLater();
        res.json(booking);
    },

    async getFiltered(req, res) {
        // Avoid injection on column
        const columns = [
            'id', 'delivered', 'closed',
            'id_permanency', 'date_permanency', 'active_permanency',
            'id_user', 'email', 'first_name', 'last_name', 'member_number', 'overdue'];
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
            return res.json(err);
        }
    },
    async addBookingByArticle(req, res) {
        const userId = Number(req.params.UserId);
        const { artIds } = req.body;

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
            const articlesBooked = (newBookingConfirm.id) && await bookingDataMapper.addArticlesToBooking(newBookingConfirm.id, artIds);

            // Update availability on each article booked to false
            // eslint-disable-next-line no-unused-vars
            const available = (articlesBooked.id) && await bookingDataMapper.updateArticlesAvailability(artIds);
            return res.json({ newBookingConfirm, articlesBooked });
        } catch (err) {
            return res.json(err);
        }
    },
    async addToBooking(req, res) {
        const userId = Number(req.params.id);
        const { articleNumber, bookingId } = req.body;

        if (!articleNumber) {
            throw new ApiError(400, 'La réservation ne peut pas être vide');
        }

        // Check if user exist
        const user = await usersDataMapper.findById(userId);
        if (!user) {
            throw new ApiError(400, 'Cet utilisateur n\'existe pas');
        }

        //  Check exisiting booking for this permanency
        const bookingExist = await bookingDataMapper.findOne(bookingId);
        if (bookingExist.length !== 1) {
            throw new ApiError(400, 'Cette réservation n\'existe pas');
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
        if (!newArticleBooking) {
            throw new ApiError(500, 'Echec de l\'ajout de l\'article');
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
    async removeBooking(req, res) {
        const bookingId = Number(req.params.id);
        const booking = await bookingDataMapper.findOne(bookingId);
        if (!bookingId || booking.length === 0) {
            throw new ApiError(400, 'Cette réservation n\'existe pas');
        }
        if (booking[0].delivered || booking[0].closed) {
            throw new ApiError(400, 'Cette reservation ne peut être supprimée');
        }
        if (booking.length === 1) {
            await bookingDataMapper.deleteAllArticles(bookingId);
            await bookingDataMapper.deleteBooking(bookingId);
            return res.json('Réservation annulée');
        }

        return res.json('La réservation n\'a pu être annulée');
    },
    async returnArticle(req, res) {
        const { id } = req.params;
        const article = await articleDataMapper.findOne(id);
        const returnArticle = await bookingDataMapper.return([id]);

        const obj = { available: true };
        const availableArticle = await articleDataMapper.update(id, obj);

        if (!availableArticle) {
            throw new ApiError(404, 'L\'article n\'existe pas');
        }
        const confirm = {
            articles: article,
            retour: returnArticle,
            update: availableArticle,
            article: id,
            reservation: returnArticle[0]?.id_booking,
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
        // take all article not return
        const listArticle = [];
        // I take each article noy returned for this booking
        booking[0].borrowed_articles.forEach(async (article) => {
            if (article.available === false) {
                listArticle.push(article.id);
            }
        });
        // If has article in the listArticle
        if (listArticle.length) {
            // I write this article is returned in dynamic table
            const returned = await bookingDataMapper.return(listArticle);
            if (returned.includes((a) => a.returned !== true)) {
                throw new ApiError(500, 'Impossible de marquer l\'article un des articles comme retourné');
            }

            // And i make the article available
            const getAvailable = await articleDataMapper.return(listArticle);
            if (getAvailable.includes((a) => a.available !== true)) {
                throw new ApiError(500, 'Impossible de marquer l\'article un des articles comme disponible');
            }
        }
        // And close the booking
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
    async returnOrClose(req, res) {
        const { id } = req.params;
        const { return_article } = req.body;

        // I take the booking
        const booking = await bookingDataMapper.findOne(id);
        // If booking not exist error
        if (!booking[0]) {
            throw new ApiError(404, `La réservation n°${id} n'existe pas`);
        }

        // I take each article not returned for this booking
        const notReturnArticle = booking[0].borrowed_articles;
        if (!return_article.length) {
            throw new ApiError(400, 'Aucun article dans la liste ');
        } else {
            // eslint-disable-next-line no-restricted-syntax
            for (const article of return_article) {
                if (!notReturnArticle.find((a) => a.id === (article))) {
                    throw new ApiError(400, 'Article non dans la réservation');
                }
            }

            // I write this article is returned in dynamic table
            const returned = await bookingDataMapper.return(return_article);
            if (returned.includes((a) => a.returned !== true)) {
                throw new ApiError(500, 'Impossible de marquer un des articles comme retourné');
            }

            // And i make the article available
            const getAvailable = await articleDataMapper.return(return_article);
            if (getAvailable.includes((a) => a.available !== true)) {
                throw new ApiError(500, 'Impossible de marquer un des articles comme disponible');
            }
        }

        // pour l'instant je ne vérifie que la longueur des listes, en cas de bug rendre le test plus robuste en comparant avec un join
        let confirm = null;
        if (return_article.length === notReturnArticle.length) {
            // And close the booking
            const closedBooking = await bookingDataMapper.close(id);
            if (closedBooking[0].closed !== true) {
                throw new ApiError(500, 'Impossible de cloturer la réservation');
            }

            confirm = {
                articles: return_article,
                reservation: id,
                message: 'Réservation cloturé avec succés',
            };
        } else {
            confirm = {
                articles: return_article,
                reservation: id,
                message: 'Articles rendu avec succès',
            };
        }
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
    async prolongArticle(req, res) {
        // params is user ID
        const { id } = req.params;
        const { prolong_article } = req.body;

        const article = Number(prolong_article);
        const user = await usersDataMapper.findFiltered([{ member_number: id }]);
        if (!user[0]) {
            throw new ApiError(500, 'Impossible de trouver l\'utilisateur');
        }
        // get activie permanency
        const activePerm = await permanencyDataMapper.findActive();
        // get active booking for this user
        const getCurrentParams = [
            { id_permanency: activePerm[0].next_id },
            { id_user: user[0].id },
        ];
        let booking = await userBookingDataMapper.findFiltered(getCurrentParams);

        // if not create new active booking
        if (!booking.length) {
            const newBooking = {
                id_permanency: activePerm[0].next_id,
                id_user: user[0].id,
            };
            // create booking
            booking = [await bookingDataMapper.addOne(newBooking)];
        }
        if (!booking[0]?.name === 'DatabaseError') {
            throw new ApiError(500, 'Impossible de trouver ou créer une réservation');
        }
        // remove article from old booking
        const deleteBooking = await bookingDataMapper.deleteArticle(article);

        if (!deleteBooking) {
            throw new ApiError(500, "Impossible de supprimer de l'ancienne réservation");
        }
        // add article to new booking
        const newBooking = await bookingDataMapper.addArticlesToBooking(booking[0].id, [article]);
        let confirm = null;
        if (newBooking) {
            confirm = {
                articles: prolong_article,
                reservation: booking,
                message: `Article n°${article} prolongé avec succès`,
            };
        } else {
            throw new ApiError(500, 'Impossible de prolonger');
        }

        return res.json(confirm);
    },
};
