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

module.exports = router;
