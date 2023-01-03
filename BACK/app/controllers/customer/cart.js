/* eslint-disable max-len */
const { cartDataMapper } = require('../../models/customer');
const { referencesDataMapper } = require('../../models/customer');
const userDataMapper = require('../../models/customer/user');

const { testUser } = require('../../helpers/testUser');
const ApiError = require('../../errors/apiError');

module.exports = {
    async getCart(req, res) {
        const userId = Number(req.params.userId);
        testUser(req, userId);
        if (Number.isNaN(userId)) {
            throw new ApiError(403, 'Cet id est invalide');
        }
        const cart = await cartDataMapper.findCartByUserId(userId);
        return res.json(cart);
    },
    async addToCart(req, res) {
        const userId = Number(req.params.userId);
        const refId = Number(req.body.refId);

        testUser(req, userId);
        if (!refId) {
            throw new ApiError(403, 'Aucune référence transmise');
        }
        const user = userDataMapper.findById(userId);
        if (!user) throw new ApiError(403, 'Utilisateur inexistant');

        const count = await cartDataMapper.countCart(userId);
        if (Number(count[0].count) >= process.env.BORROW_LIMIT) throw new ApiError(403, `Taille maximale du panier atteinte (${process.env.BORROW_LIMIT})`);

        const refExist = await referencesDataMapper.findOne(refId);

        if (refExist.length < 1) throw new ApiError(403, "Cette référence n'existe pas");

        if (refExist[0].nb_available < 1) throw new ApiError(403, "Cette référence n'est pas disponible");

        const refIsInCart = await cartDataMapper.findRefByUserId(userId, refId);
        if (refIsInCart.length > 0) throw new ApiError(403, 'Cet article est déjà dans le panier');

        const cart = await cartDataMapper.addRef(userId, refId);
        return res.json(cart);
    },
    async delete(req, res) {
        const userId = Number(req.params.userId);

        testUser(req, userId);
        const refId = Number(req.body.refId);
        const refIsInCart = await cartDataMapper.findRefByUserId(userId, refId);

        if (refIsInCart.length < 1) {
            throw new ApiError(403, "Cet article n'est pas dans le panier");
        }
        const cart = await cartDataMapper.deleteOne(userId, refId);
        return res.json(cart);
    },
    async clear(req, res) {
        const userId = Number(req.params.userId);
        testUser(req, userId);
        const cart = await cartDataMapper.clear(userId);
        return res.json(cart);
    },
};
