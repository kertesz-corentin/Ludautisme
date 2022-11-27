const { favoriteDataMapper } = require('../../models/customer');
const userDataMapper = require('../../models/customer/user');
const ApiError = require('../../errors/apiError');

const { testUser } = require('../../helpers/testUser');

module.exports = {
    async getAll(req, res) {
        const idUser = Number(req.params.userId);
        testUser(req, idUser);
        const result = await userDataMapper.findById(idUser);
        if (!result) throw new ApiError(404, 'Cet utilisateur n\'existe pas');

        const favorites = await favoriteDataMapper.findAll(idUser);
        return res.json(favorites);
    },
    async addRef(req, res) {
        const idUser = Number(req.params.userId);

        testUser(req, idUser);
        const result = await userDataMapper.findById(idUser);
        if (!result) throw new ApiError(404, 'Cet utilisateur n\'existe pas');

        const idRef = Number(req.body.refId);
        if (Number.isNaN(idRef)) {
            throw new ApiError(403, 'Aucune référence transmise');
        }
        const refs = await favoriteDataMapper.addRef(idUser, idRef);
        return res.json(refs);
    },
    async deleteRef(req, res) {
        const idUser = Number(req.params.userId);
        testUser(req, idUser);

        const result = await userDataMapper.findById(idUser);
        if (!result) throw new ApiError(404, 'Cet utilisateur n\'existe pas');

        const idRef = Number(req.body.refId);
        if (Number.isNaN(idRef)) {
            throw new ApiError(403, 'Aucune référence transmise');
        }
        const refs = await favoriteDataMapper.deleteRef(idUser, idRef);
        return res.json(refs);
    },
};
