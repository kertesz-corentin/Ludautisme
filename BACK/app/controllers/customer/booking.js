/* eslint-disable max-len */
const { bookingDataMapper } = require('../../models/customer');
const { usersDataMapper, permanencyDataMapper } = require('../../models/admin');
const ApiError = require('../../errors/apiError');

module.exports = {
    async getActive(req, res) {
        const idUser = Number(req.params.id);
        const booking = await bookingDataMapper.findActive(idUser);
        return res.json(booking);
    },
    async getHistory(req, res) {
        const idUser = Number(req.params.id);
        const booking = await bookingDataMapper.findHistory(idUser);
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
        console.log(refAvailability);
        if (refAvailability.length !== refIds.length) {
            const unknownRef = refIds.filter((refId) => !refAvailability.map(ref => ref.id).includes(refId));
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
};
