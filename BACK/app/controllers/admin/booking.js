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

    async addOne(req, res) {
        const userId = Number(req.params.UserId);
        const articlesIds = req.body.articleIds;

        // Check if too much articles are booked
        if (articlesIds && articlesIds.length > 7) {
            throw new ApiError(400, 'La réservation ne peut pas comporter plus de 8 articles');
        }

        // Check if user exist
        const user = await usersDataMapper.findById(userId);
        if (user.length !== 1) {
            throw new ApiError(400, 'Cet utilisateur n\'existe pas');
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
            throw new ApiError(400, 'Cet utilisateur à déjà une réservation pour cette permanence');
        }

        // Check if articles are available
        const available = await bookingDataMapper.getArticlesAvailability(articlesIds);
        if (!available.every((article) => article.available)) {
            const unavailable = available.filter((article) => !article.available);
            const test = unavailable.map((article) => {return `number ${article.number}`});
            console.log(test);
            throw new ApiError(400, `Ce ou ces articles sont indisponibles : ${JSON.stringify(test)}`);
        }

        const newBooking = {
            id_permanency: activePerm[0].next_id,
            id_user: userId,
        };
        // Add booking to get an id booking
        const newBookingConfirm = await bookingDataMapper.addOne(newBooking);
        // Update availability on each article
        await bookingDataMapper.updateArticlesAvailability(articlesIds);
        const articlesBooked = await bookingDataMapper.addArticlesToBooking(newBookingConfirm.id, articlesIds);
        console.log(articlesBooked);
        return res.json({ newBookingConfirm, articlesBooked });
    },
};
