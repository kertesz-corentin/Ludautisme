const express = require('express');
const { userController, loginController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * POST /api/admin/users/search
 * @summary Get filtered users detailed informations
 * @tags Users
 * @return {users} 200 - success response - application/json
 */

router.route('/search')
    .post(controllerHandler(userController.getFiltered));
/**
 * POST /api/admin/login
 * @summary Get login for admin
 * @tags Login
 * @param {paramLogin} request.body.required
 * @return {allOf|users|token} 200 - success response - application/json
 */
router.route('/login')
    .post(controllerHandler(loginController.login));
/**
 * GET /api/admin/users
 * @summary Get all users detailed informations
 * @tags Users
 * @return {users} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(userController.getAll));

module.exports = router;
