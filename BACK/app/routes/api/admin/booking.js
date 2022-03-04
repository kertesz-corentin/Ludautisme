const express = require('express');
const { bookingController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * GET /api/admin/booking
 * @summary Get all detailed booking
 * @tags Users
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(bookingController.getAll));
/**
 * POST /api/admin/booking/search
 * @summary Get detailed booking with details
 * @tags Users
 * @param {paramSearchBooking} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */
router.route('/search')
    .post(controllerHandler(bookingController.getFiltered));

module.exports = router;
