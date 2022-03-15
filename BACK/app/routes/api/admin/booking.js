const express = require('express');
const ApiError = require('../../../errors/apiError');
const { bookingController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * GET /api/admin/booking
 * @summary Get all detailed booking
 * @tags [ADMIN] Booking
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(bookingController.getAll));
/**
 *POST /api/admin/booking/close/:id
 @summary Close one booking
 @tags [ADMIN] Booking
 @param {number} request.params.id.required - ID of booking
 @param {array<number>} request.body.id.required - ID of articles
 @return {Confirm} 200 - success response - application/json
 */
router.route('/close/:id')
    .post(controllerHandler(bookingController.close));
/**
 * PUT /api/admin/booking/article/:userId
 * @summary Add one article to booking
 * @tags [ADMIN] Booking
 * @param {number} request.params.required - ID of user
 * @param {BookingParam} request.body.required - ID of article
 * @return {Confirm} 200 - success response - application/json
 */
/**
 * DELETE /api/admin/booking/article/:id
 * @summary Remove one article to booking
 * @tags [ADMIN] Booking
 * @param {number} request.params.required - ID of article
 * @return {Confirm} 200 - success response - application/json
 */
router.route('/article/:id')
    .put(controllerHandler(bookingController.addToBooking))
    .delete(controllerHandler(bookingController.removeToBooking));
/**
 * POST /api/admin/booking/return/:id
 * @tags [ADMIN] Booking
 * @param {number} request.params.required - ID of article
 * @return {Confirm} 200 - success response - applcation/json
 */
router.route('/return/:id')
    .post(controllerHandler(bookingController.returnArticle));
/**
 * GET /api/admin/booking/:id
 * @summary Get a single booking
 * @tags [ADMIN] Booking
 * @param {number} request.params.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */

router.route('/:id')
    .get(controllerHandler(bookingController.getOne))
    .put(controllerHandler(bookingController.addToBooking));
/**
 * POST /api/admin/booking/add/:UserId
 * @summary Add a new booking
 * @tags [ADMIN] Booking
 * @param {number} request.params.id.required - Id of user
 * @param {paramAddBooking} request.body.required - At least one of these params
 * @return {booking} 200 - success response - application/json
 */
router.route('/add/:UserId')
    .post(controllerHandler(bookingController.addBookingByArticle));
/**
 * POST /api/admin/booking/search
 * @summary Get detailed booking with details
 * @tags [ADMIN] Booking
 * @param {paramSearchBooking} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */
router.route('/search')
    .post(controllerHandler(bookingController.getFiltered));
router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
