const { favoriteDataMapper } = require('../../models/customer');
const ApiError = require('../../errors/apiError');

module.exports = {
    async getAll(req, res) {
        const idUser = Number(req.params.userId);
        const favorites = await favoriteDataMapper.findAll(idUser);
        return res.json(favorites);
    },
    async addRef(req, res) {
        const idUser = Number(req.params.userId);
        const idRef = Number(req.body.refId);
        if (!idRef) {
            throw new ApiError(403, 'Aucune référence transmise');
        }
        const refs = await favoriteDataMapper.addRef(idUser, idRef);
        return res.json(refs);
    },
    async deleteRef(req, res) {
        const idUser = Number(req.params.userId);
        const idRef = Number(req.body.refId);
        if (!idRef) {
            throw new ApiError(403, 'Aucune référence transmise');
        }
        const refs = await favoriteDataMapper.deleteRef(idUser, idRef);
        return res.json(refs);
    },
};
