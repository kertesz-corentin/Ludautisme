const express = require('express');
const { cartController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();
/**
 * GET /api/customer/cart/:userId
 * @summary Get persistent Cart
 * @tags [CUSTOMER] Cart
 * @param {number} userId.params.required
 * @return {cartRefList} 200 - Success response - application/json
 */

/**
 * DELETE /api/customer/cart/:userId
 * @summary Clear persistent Cart (All items)
 * @tags [CUSTOMER] Cart
 * @param {number} UserId.params.required
 * @return {string} 200 - Success response - application/json
 */

router.route('/:userId')
    .get(controllerHandler(cartController.getCart))
    .delete(controllerHandler(cartController.clear));

/**
 * POST /api/customer/cart/reference/:userId
 * @summary Add a reference to persistent Cart
 * @tags [CUSTOMER] Cart
 * @param {number} UserId.params.required
 * @param {cartRefParams} request.body.required
 * @return {object} 200 - Success response - application/json
 * @return {string} 403 - Error response - application/json
 */

/**
 * DELETE /api/customer/cart/reference/:userId
 * @summary Delete a reference in persistent Cart
 * @tags [CUSTOMER] Cart
 * @param {number} UserId.params.required
 * @return {string} 200 - Success response - application/json
 */
router.route('/reference/:userId')
    .post(controllerHandler(cartController.addToCart))
    .delete(controllerHandler(cartController.delete));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
