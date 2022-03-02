const ApiError = require('../../../errors/apiError');

const userReferenceDataMapper = require('../../../models/customer/references');

module.exports = {
    async getAll(_, res) {
        // const references = await userReferenceDataMapper.getAll();
        return res.json('coucou');
    },
};
