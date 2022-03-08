const ApiError = require('../../errors/apiError');
const { bookingDataMapper } = require('../../models/admin');

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
            if (['id', 'member_number'].includes(columns[index]) && Number.isNaN(value)) {
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
        console.log("userId", userId, "articles", articlesIds);
        const currentArticles = 2;
        if (articlesIds && articlesIds.length > 8) {
            throw new ApiError(400, 'La réservation ne peut pas comporter plus de 8 articles');
        }


        //Une autre réservation sur cette perm ne doit pas exister
        //Pas plus de 8 articles
        //const newBooking = await bookingDataMapper.addOne(userId, articlesIds);
        return res.json({ coucou: "coucou" });
    },
};
