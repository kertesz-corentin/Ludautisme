const express = require('express');
const { contactController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * POST /api/customer/contact/send
 * @summary Send contact message
 * @tags [CUSTOMER] Contact
 * @params {} request.body.required - Form body
 * @return {object} 200 - Success response - application/json
 */
router.route('/send')
    .post(controllerHandler(contactController.send));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
