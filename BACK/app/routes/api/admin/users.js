const express = require('express');
const { userController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * POST /api/admin/users/search
 * @summary Get filtered users detailed informations
 * @tags Users
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

router.route('/search')
    .post(controllerHandler(userController.getFiltered));

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
// .patch(controllerHandler(userController.update));

module.exports = router;
