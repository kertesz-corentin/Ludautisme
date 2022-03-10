const express = require('express');
const { categoryController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * GET /api/customer/category
 * @summary Get all categories
 * @tags Category Customer
 * @return {customerUsers} 200 - success response - application/json
 */

router.route('/')
    .get(controllerHandler(categoryController.getAll));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
