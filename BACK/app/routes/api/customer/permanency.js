const express = require('express');
const { permanencyController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * GET api/customer/permanency/
 * @summary Get Active Permanency
 * @tags [CUSTOMER] Permanency
 * @returns  200 - success response - application/json
 */

router.route('/')
    .get(controllerHandler(permanencyController.getActive));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
