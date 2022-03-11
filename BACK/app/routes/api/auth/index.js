const express = require('express');
const ApiError = require('../../../errors/apiError');
const loginController = require('../../../controllers/auth/login');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * POST /api/login/user
 * @summary Login one user
 * @tags [AUTH] Login
 * @param {paramLogin} request.body.required
 * @return {login} 200 - success response - application/json
 */

router.route('/user')
    .post(controllerHandler(loginController.login));

/**
 * POST /api/login/admin
 * @summary Login for admin
 * @tags [AUTH] Login
 * @param {paramLogin} request.body.required
 * @return {login} 200 - success response - application/json
 */

router.route('/admin')
    .post(controllerHandler(loginController.login));

/**
 * POST /api/login/forgot-password
 * @summary Send an email to user with temp token
 * @tags [AUTH] Login
 * @param {paramForgotPwd} request.body.required
 * @return {string} 200 - success response - application/json
 */

router.route('/forgot-password')
    .post(controllerHandler(loginController.forgotPassword));

/**
 * GET /api/login/reset-password
 * @summary Reset password if user got an email
 * @tags [AUTH] Login
 * @param {paramResetPwd} request.body.required
 * @return {login} 200 - success response - application/json
 */
router.route('/reset-password')
    .post(controllerHandler(loginController.resetPassword));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
