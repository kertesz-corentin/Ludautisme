const express = require('express');
const { userController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * GET /api/admin/users/:id
 * @summary Get information for one user
 * @tags Users
 * @param {number} request.params.id.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

/**
 * PUT /api/admin/users/search
 * @summary Modify information for one user
 * @tags Users
 * @param {number} request.params.id.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

router.route('/:id')
    .get(controllerHandler(userController.getById))
    .put(controllerHandler(userController.update));

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
// .patch(controllerHandler(userController.update));

module.exports = router;
