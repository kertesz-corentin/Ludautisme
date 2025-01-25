const ApiError = require('../../errors/apiError');
const { statDataMapper } = require('../../models/admin');

module.exports = {
    async getUser(req, res) {
        const user = await statDataMapper.getUser();
        res.json(user);
    },
    async getBooking(req, res) {
        const booking = await statDataMapper.getBooking();
        res.json(booking);
    },
    async getGames(req, res) {
        const games = await statDataMapper.getGames();
        res.json(games);
    },
    async getCategory(req, res) {
        const category = await statDataMapper.getCategory();
        res.json(category);
    },
};
