const express = require('express');
const { favoriteController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * GET /api/customer/favorite/:userId
 * @summary Get All Favorite references
 * @tags [CUSTOMER] Favorites
 * @param {number} userId.params.required
 * @return {cartRefList} 200 - Success response - application/json
 */
/**
 * POST /api/customer/favorite/:userId
 * @summary Add a Favorite
 * @tags [CUSTOMER] Favorites
 * @param {number} userId.params.required
 * @param {cartRefParams} request.body.required
 * @return {cartRefList} 200 - Success response - application/json
 */
router.route('/:userId')
    .get(controllerHandler(favoriteController.getAll))
    .post(controllerHandler(favoriteController.addRef))
    .delete(controllerHandler(favoriteController.deleteRef));

module.exports = router;
