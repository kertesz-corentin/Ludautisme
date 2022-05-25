/* eslint-disable max-len */
const { cartDataMapper } = require('../../models/customer');
const { referencesDataMapper } = require('../../models/customer');
const ApiError = require('../../errors/apiError');

module.exports = {
    async getCart(req, res) {
        const idUser = Number(req.params.id);
        const cart = await cartDataMapper.findCartByUserId(idUser);
        return res.json(cart);
    },
    async addToCart(req, res) {
        const idUser = Number(req.params.id);
        const refId = Number(req.body.refId);
        if (!refId) {
            throw new ApiError(403, 'Aucune référence transmise');
        }
        const count = await cartDataMapper.countCart(idUser);
        if (count[0].count >= process.env.BORROW_LIMIT) {
            throw new ApiError(403, `Taille maximale du panier atteinte (${process.env.BORROW_LIMIT})`);
        }
        const refExist = await referencesDataMapper.findOne(refId);
        if (refExist.length < 1) {
            throw new ApiError(403, "Cette référence n'existe pas");
        }
        if (refExist[0].nb_available < 1) {
            throw new ApiError(403, "Cette référence n'est pas disponible");
        }
        const refIsInCart = await cartDataMapper.findRefByUserId(idUser, refId);
        if (refIsInCart.length > 0) {
            throw new ApiError(403, 'Cet article est déjà dans le panier');
        }
        const cart = await cartDataMapper.addRef(idUser, refId);
        return res.json(cart);
    },
    async delete(req, res) {
        const idUser = Number(req.params.id);
        const refId = Number(req.body.refId);
        const refIsInCart = await cartDataMapper.findRefByUserId(idUser, refId);
        if (refIsInCart.length < 1) {
            throw new ApiError(403, "Cet article n'est pas dans le panier");
        }
        const cart = await cartDataMapper.deleteOne(idUser, refId);
        return res.json(cart);
    },
    async clear(req, res) {
        const idUser = Number(req.params.id);
        const cart = await cartDataMapper.clear(idUser);
        return res.json(cart);
    },
};
