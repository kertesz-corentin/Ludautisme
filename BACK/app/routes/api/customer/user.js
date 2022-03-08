const express = require('express');
const { userController } = require('../../../controllers/api/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * GET /api/customer/users/:id
 * @summary Get information for one user
 * @tags Customer Users
 * @param {number} request.params.id.required - At least one of these params
 * @return {customerUsers} 200 - success response - application/json
 */

/**
 * PUT /api/customer/users/:id
 * @summary Modify information for one user
 * @tags Customer Users
 * @param {number} request.params.id.required - At least one of these params
 * @return {customerUsers} 200 - success response - application/json
 */

router.route('/:id')
    .get(controllerHandler(userController.getById))
    .put(controllerHandler(userController.update));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
