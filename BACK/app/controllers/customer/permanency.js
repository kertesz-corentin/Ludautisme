const ApiError = require('../../errors/apiError');
const userReferenceDataMapper = require('../../models/customer/permanency');

module.exports = {
    async getActive(_, res) {
        const references = await userReferenceDataMapper.findActive();
        if (!references) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(references);
    },
};
