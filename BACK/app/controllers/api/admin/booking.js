const ApiError = require('../../../errors/apiError');
const bookingDataMapper = require('../../../models/admin/users');

module.exports = {
    getAll(_,res) {
        res.json('coucou');
    }
}
