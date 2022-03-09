/* eslint-disable max-len */
const ApiError = require('../../errors/apiError');
const { bookingDataMapper, permanencyDataMapper, articleDataMapper,usersDataMapper } = require('../../models/admin');

module.exports = {
    async getAll(_, res) {
        const booking = await bookingDataMapper.findAll();
        res.json(booking);
    },

    async getFiltered(req, res) {
        //Avoid injection on column
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

    async addOne(req, res) {
        const userId = Number(req.params.UserId);
        const articlesIds = req.body.articleIds;
        // Check if user exist
        const user = await usersDataMapper.findById(userId);
        if (user.length !== 1) {
            throw new ApiError(400, 'Cet utilisateur n\'existe pas');
        }

        if (articlesIds && articlesIds.length > 8) {
            throw new ApiError(400, 'La réservation ne peut pas comporter plus de 8 articles');
        }
        //  Check exisiting booking for this permanency
        const activePerm = await permanencyDataMapper.findActive();
        console.log(activePerm[0].next_id);
        const getCurrentParams = [
            { id_permanency: activePerm[0].next_id },
            { id_user: userId },
        ];
        const bookingExist = await bookingDataMapper.findFiltered(getCurrentParams);
        console.log("booking", bookingExist);
        if (bookingExist.length > 0) {
            throw new ApiError(400, 'Une réservation existe déjà pour cet utilisateur pour cette permanence');
        }

        const newBooking = {
            id_permanency: activePerm[0].next_id,
            id_user: userId,
        };
        // Add booking to get an id booking
        const newBookingConfirm = await bookingDataMapper.addOne(newBooking);
        // Add link between article_number and booking
        const articlesUnavailables = await bookingDataMapper.updateArticlesAvailability(articlesIds);
        console.log(articlesUnavailables);
        const articlesBooked = await bookingDataMapper.addArticlesToBooking(newBookingConfirm.id, articlesIds);
        console.log(articlesBooked);
        return res.json({ coucou: "coucou" });
    },
};
