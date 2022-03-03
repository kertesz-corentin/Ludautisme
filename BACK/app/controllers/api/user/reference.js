const ApiError = require('../../../errors/apiError');

const userReferenceDataMapper = require('../../../models/customer/references');

module.exports = {
    async getAll(_, res) {
        const references = await userReferenceDataMapper.findAll();
        return res.json(references);
    },
};
