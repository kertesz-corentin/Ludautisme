const express = require('express');
const { loginController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * POST /api/login/user
 * @summary Login one user
 * @tags Login
 * @param {paramLogin} request.body.required
 * @return {login} 200 - success response - application/json
 */

router.route('/user')
    .post(controllerHandler(loginController.login));

/**
 * POST /api/login/admin
 * @summary Login for admin
 * @tags Login
 * @param {paramLogin} request.body.required
 * @return {login} 200 - success response - application/json
 */

router.route('/admin')
    .post(controllerHandler(loginController.login));

/**
 * POST /api/login/reset-password
 * @summary Reset password if user got an email
 * @tags Login
 * @param {paramResetPwd} request.body.required
 * @return {login} 200 - success response - application/json
 */

router.route('/forgot-password')
    .post(controllerHandler(loginController.forgotPassword));

router.route('/reset-password')
    .get(controllerHandler(loginController.resetPassword));

module.exports = router;
