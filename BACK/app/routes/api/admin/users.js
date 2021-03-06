const express = require('express');
const ApiError = require('../../../errors/apiError');
const { usersController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * GET /api/admin/users/:id
 * @summary Get information for one user
 * @tags [ADMIN] Users
 * @param {number} request.params.id.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

/**
 * PUT /api/admin/users/:id
 * @summary Modify information for one user
 * @tags [ADMIN] Users
 * @param {number} request.params.id.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

/**
 * DELETE /api/admin/users/:id
 * @summary Delete One user
 * @tags [ADMIN] Users
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
 * @tags [ADMIN] Users
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {users} 200 - success response - application/json
 */

router.route('/search')
    .post(controllerHandler(usersController.getFiltered));

/**
 * GET /api/admin/users
 * @summary Get all users detailed informations
 * @tags [ADMIN] Users
 * @return {users} 200 - success response - application/json
 */

/**
 * POST /api/admin/users
 * @summary Create a new user
 * @tags [ADMIN] Users
 * @param {paramUserCreate} request.body.required
 * @return {users} 200 - success response - application/json
 */

router.route('/')
    .get(controllerHandler(usersController.getAll))
    .post(controllerHandler(usersController.create));
router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
