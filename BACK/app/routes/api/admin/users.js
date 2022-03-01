const express = require('express');
const { userController, loginController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const authAdmin = require('../../../middleware/admin');

const router = express.Router();
/**
 * POST /api/admin/users/search
 * @summary Get filtered users detailed informations
 * @tags Users
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

router.route('/search')
    .post(authAdmin, controllerHandler(userController.getFiltered));
/**
 * POST /api/admin/login
 * @summary Get login for admin
 * @tags Login
 * @param {paramLogin} request.body.required
 * @return {allOf|users|token} 200 - success response - application/json
 */
router.route('/login')
    .post(controllerHandler(loginController.login));

router.route('/:id')
    .get(controllerHandler(userController.getById))
    .put(controllerHandler(userController.update));
/**
 * GET /api/admin/users
 * @summary Get all users detailed informations
 * @tags Users
 * @return {users} 200 - success response - application/json
 */

/**
 * POST /api/admin/users
 * @summary Create a new user
 * @tags Users
 * @param {paramUserCreate} request.body.required
 * @return {users} 200 - success response - application/json
 */

router.route('/')
    .get(controllerHandler(userController.getAll))
    .post(controllerHandler(userController.create));

module.exports = router;
