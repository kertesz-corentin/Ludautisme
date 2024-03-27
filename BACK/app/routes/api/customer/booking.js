const express = require('express');
const { bookingController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * GET /api/customer/booking/active/:UserId
 * @summary Get active booking for one user
 * @tags [CUSTOMER] Booking
 * @param {number} UserId.params.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */

router.route('/active/:id')
    .get(controllerHandler(bookingController.getActive));

/**
 * GET /api/customer/booking/history/:UserId
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

/**
 * POST /api/customer/booking/extend/:UserId
 * @summary ask for extend booking
 * @tags [CUSTOMER] demande la prolongation d'articles
 * @param {number} UserId.params.required - At least one of these params
 * @param {number[]} request.body.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */
router.route('/extend/:UserId')
    .post(controllerHandler(bookingController.extendBooking));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
