const express = require('express');
const { bookingController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * GET /api/admin/booking/active/:UserId
 * @summary Get a single booking
 * @tags [CUSTOMER] Booking
 * @param {number} UserId.params.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */

router.route('/active/:id')
    .get(controllerHandler(bookingController.getActive));

/**
 * GET /api/admin/booking/history/:UserId
 * @summary Get all past Booking
 * @tags [CUSTOMER] Booking
 * @param {number} UserId.params.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */

router.route('/history/:id')
    .get(controllerHandler(bookingController.getHistory));

/**
 * POST /api/customer/booking/add/:UserId
 * @summary Add new Booking
 * @tags [CUSTOMER] Booking
 * @param {number} UserId.params.required - At least one of these params
 * @param {paramAddBookingByRef} request.body.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */

router.route('/add/:UserId')
    .post(controllerHandler(bookingController.addBookingByRef));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
