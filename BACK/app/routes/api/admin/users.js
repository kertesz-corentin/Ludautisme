const express = require('express');
const { userController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * POST /api/admin/users/search
 * @summary Get filtered users detailed informations
 * @tags Users
 * @param {usersSearch} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

router.route('/search')
    .post(controllerHandler(userController.getFiltered));

/**
 * GET /api/admin/users
 * @summary Get all users detailed informations
 * @tags Users
 * @return {users} 200 - success response - application/json
 */

router.route('/')
    .get(controllerHandler(userController.getAll))
    .post(controllerHandler(userController.create));

module.exports = router;
