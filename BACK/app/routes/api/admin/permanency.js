const express = require('express');
const ApiError = require('../../../errors/apiError');
const { permanencyController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * GET api/permanency
 * @summary Get all permanencies
 * @tags Permanency
 * @return {permanency} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(permanencyController.getAll));
/**
 * GET api/permanency/active
 * @summary Get active and next permanency
 * @tags Permanency
 * @return {permanency} 200 - success response - application/json
 */
router.route('/active')
    .get(controllerHandler(permanencyController.getActive));
/**
 * GET api/permanency/close
 * @summary Close actual permanency and créate a new one without date
 * @tags Permanency
 * @return {permanency} 200 - success response - application/json
 */
router.route('/active/close')
    .get(controllerHandler(permanencyController.closeActive));
/**
 * PATCH api/admin/next
 * @summary Set date of next permanency
 * @tags Permanency
 * @return {permanency} 200 - success response - application/json
 */
router.route('/next')
    .patch(controllerHandler(permanencyController.setDateNext));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
