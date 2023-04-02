/* eslint-disable consistent-return */
/* eslint-disable max-len */
const { userBookingDataMapper } = require('../../models/customer');
const { usersDataMapper, permanencyDataMapper, referenceDataMapper } = require('../../models/admin');
const ApiError = require('../../errors/apiError');

const { testUser } = require('../../helpers/testUser');

module.exports = {
    async getActive(req, res) {
        const idUser = Number(req.params.id);
        testUser(req, idUser);
        const booking = await userBookingDataMapper.findActive(idUser);
        return res.json(booking);
    },
    async getHistory(req, res) {
        const idUser = Number(req.params.id);
        testUser(req, idUser);
        const booking = await userBookingDataMapper.findHistory(idUser);

        return res.json(booking);
    },

    async addBookingByRef(req, res) {
        const userId = Number(req.params.UserId);
        testUser(req, userId);
        const { refIds } = req.body;

        const duplicateElement = refIds.filter((item, index) => refIds.indexOf(item) !== index);
        if (duplicateElement[0]) {
            throw new ApiError(403, 'La réservation ne peut pas contenir de doublon');
        }
        // Check if too much articles are booked
        if (!refIds || refIds.length > process.env.BORROW_LIMIT - 1) {
            throw new ApiError(403, 'La réservation ne peut pas être vide ou comporter plus de 8 articles');
        }

        // Check if user exist
        const user = await usersDataMapper.findById(userId);
        if (user.length !== 1) {
            throw new ApiError(403, 'Cet utilisateur n\'existe pas');
        }

        //  Get active perm id and next perm id
        const activePerm = await permanencyDataMapper.findActive();
        //  Check exisiting booking for this permanency
        const getCurrentParams = [
            { id_permanency: activePerm[0].next_id },
            { id_user: userId },
        ];
        const bookingExist = await userBookingDataMapper.findFiltered(getCurrentParams);
        if (bookingExist.length > 0) {
            throw new ApiError(403, 'Cet utilisateur à déjà une réservation pour cette permanence');
        }

        // Check if articles are available
        const refAvailability = await userBookingDataMapper.getRefsAvailability(refIds);
        if (refAvailability.length !== refIds.length) {
            const unknownRefIds = refIds.filter((refId) => !refAvailability.map((ref) => ref.id).includes(refId));
            const unknownRef = await referenceDataMapper.findManyWithRefId(unknownRefIds);
            throw new ApiError(403, `Référence(s) inconnues ou indisponibles : [ ${unknownRef.map((ref) => `idRef : ${ref.id} - ${ref.name}`)} ]`);
        }

        try {
            const newBooking = {
                id_permanency: activePerm[0].next_id,
                id_user: userId,
            };
            // Add booking to get an id booking
            const newBookingConfirm = await userBookingDataMapper.addOne(newBooking);
            // Join articles to booking
            const articlesIds = refAvailability.map((ref) => ref.article_id);
            const articlesBooked = await userBookingDataMapper.addArticlesToBooking(newBookingConfirm.id, articlesIds);
            // Update availability on each article booked to false
            await userBookingDataMapper.updateArticlesAvailability(articlesIds);
            return res.json({ newBookingConfirm, articlesBooked });
        } catch (err) {
            res.json(err);
        }
    },
};
