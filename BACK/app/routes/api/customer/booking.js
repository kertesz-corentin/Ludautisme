const express = require('express');
const { bookingController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * GET /api/admin/booking/active/:id
 * @summary Get a single booking
 * @tags Booking
 * @return {booking} 200 - success response - application/json
 */

router.route('/active/:id')
    .get(controllerHandler(bookingController.getActive));

/**
 * GET /api/admin/booking/history/:id
 * @summary Get all past Booking
 * @tags Booking
 * @return {booking} 200 - success response - application/json
 */

router.route('/history/:id')
    .get(controllerHandler(bookingController.getHistory));

/**
 * POST /api/customer/booking/add
 * @summary Add new Booking
 * @tags Category Booking
 * @return {string} 200 - success response - application/json
 */

router.route('/add/:UserId')
    .post(controllerHandler(bookingController.addBooking));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
