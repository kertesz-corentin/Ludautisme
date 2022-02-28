const express = require('express');
const { loginController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * GET /api/user/login
 * @summary Login one user
 * @tags Users
 * @return {users} 200 - success response - application/json
 */

router.route('/login')
    .post(controllerHandler(loginController.login));

module.exports = router;
