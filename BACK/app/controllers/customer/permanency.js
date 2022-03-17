const ApiError = require('../../errors/apiError');
const permanencyDataMapper = require('../../models/customer/permanency');

module.exports = {
    async getActive(_, res) {
        const references = await permanencyDataMapper.findActive();
        if (!references) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(references);
    },
};
