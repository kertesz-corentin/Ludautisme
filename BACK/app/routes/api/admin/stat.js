const express = require('express');
const ApiError = require('../../../errors/apiError');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const { statController } = require('../../../controllers/admin');

const router = express.Router();

/**
 * GET api/admin/stat/user
 * @summary all active user by type
 * @tags [ADMIN] Stat
 * @return 200 - success response - application/json
 */

router.route('/user')
    .get(controllerHandler(statController.getUser));

/**
 * GET api/admin/stat/booking
 * @summary booking by month
 * @tags [ADMIN] Stat
 * @return 200 - success response - application/json
 */
router.route('/booking')
    .get(controllerHandler(statController.getBooking));

/**
 * GET api/admin/stat/games
 * @summary most booked games
 * @tags [ADMIN] Stat
 * @return 200 - success response - application/json
 */
router.route('/games')
    .get(controllerHandler(statController.getGames));

/**
 * GET api/admin/stat/category
 * @summary most booked category
 * @tags [ADMIN] Stat
 * @return 200 - success response - application/json
 */
router.route('/category')
    .get(controllerHandler(statController.getCategory));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
