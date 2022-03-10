/* eslint-disable max-len */
const ApiError = require('../../errors/apiError');
const { bookingDataMapper, permanencyDataMapper, articleDataMapper, usersDataMapper } = require('../../models/admin');

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

    async addBooking(req, res) {
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
        console.log(refAvailability);
        if (refAvailability.length !== refIds.length) {
            const unknownRef = refIds.filter((refId) => !refAvailability.map(ref=> ref.id).includes(refId));
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
            console.log(articlesBooked);
            return res.json({ newBookingConfirm, articlesBooked });
        } catch (err) {
            res.json(err);
        }
    },
    async updateBooking(req, res) {
        const userId = Number(req.params.id);
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
        if (bookingExist.length !== 1) {
            throw new ApiError(400, 'Cet utilisateur n\'as pas de réservation ou en a trop');
        }
        console.log(bookingExist);

        // Check if articles are available
        const refAvailability = await bookingDataMapper.getRefsAvailability(refIds);
        const newRefs = bookingExist.borrowed_articles.filter((ref) => !refIds.includes(ref.id));
        console.log("test",refAvailability);
        if (refAvailability.length !== refIds.length) {
            const unknownRef = refIds.filter((refId) => !refAvailability.map(ref=> ref.id).includes(refId));
            throw new ApiError(400, `Référence(s) inconnues : [ ${unknownRef} ]`);
        }
        if (!refAvailability.every((ref) => ref.article_available)) {
            const unavailableRef = refAvailability.filter((ref) => ref.article_available === false);
            const errorString = unavailableRef.map((ref) => `[ ${ref.id} ${ref.name} ]`);
            throw new ApiError(400, `Ce ou ces articles sont indisponibles : ${errorString}`);
        }
        console.log(refAvailability);
        try {
            res.json({ test: 'coucou' });
        } catch (err) {
            res.json(err);
        }
    },
};
