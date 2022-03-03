const ApiError = require('../../../errors/apiError');
const bookingDataMapper = require('../../../models/admin/booking');

module.exports = {
    async getAll(_,res) {
        const booking = await bookingDataMapper.findAll();
        res.json(booking);
    }
}
