const express = require('express');
const ApiError = require('../../../errors/apiError');
const { bookingController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * GET /api/admin/booking
 * @summary Get all detailed booking
 * @tags Booking
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(bookingController.getAll));
/**
 * GET /api/admin/booking/:id
 * @summary Get a single booking
 * @tags Booking
 * @param {number} request.params.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */

router.route('/:id')
    .get(controllerHandler(bookingController.getOne))
    .put(controllerHandler(bookingController.updateBooking));

/**
 * POST /api/admin/booking/add/:UserId
 * @summary Add a new booking
 * @tags Booking
 * @param {paramAddBooking} request.body.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */
router.route('/add/:UserId')
    .post(controllerHandler(bookingController.addBookingByArticle));
/**
 * POST /api/admin/booking/search
 * @summary Get detailed booking with details
 * @tags Booking
 * @param {paramSearchBooking} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */
router.route('/search')
    .post(controllerHandler(bookingController.getFiltered));
router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
