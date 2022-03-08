const express = require('express');
const { usersController } = require('../../../controllers/admin');
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
 * PUT /api/admin/users/:id
 * @summary Modify information for one user
 * @tags Users
 * @param {number} request.params.id.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

/**
 * DELETE /api/admin/users/:id
 * @summary Delete One user
 * @tags Users
 * @param {number} request.params.id.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

router.route('/:id')
    .get(controllerHandler(usersController.getById))
    .put(controllerHandler(usersController.update))
    .delete(controllerHandler(usersController.delete));

/**
 * POST /api/admin/users/search
 * @summary Get filtered users detailed informations
 * @tags Users
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

router.route('/search')
    .post(controllerHandler(usersController.getFiltered));

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
    .get(controllerHandler(usersController.getAll))
    .post(controllerHandler(usersController.create));

module.exports = router;
