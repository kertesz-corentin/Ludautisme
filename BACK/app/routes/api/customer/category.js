const express = require('express');
const { categoryController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

/**
 * GET /api/customer/category
 * @summary Get all categories
 * @tags [CUSTOMER] Category
 * @return {Category} 200 - success response - application/json
 */

/**
 * POST /api/customer/category/search
 * @summary Search category with filter
 * @tags [CUSTOMER] Category
 * @param {Category} request.body.required
 * @return {Category} 200 - success response - application/json
 */

router.route('/')
    .get(controllerHandler(categoryController.getAll));

router.route('/search')
    .post(controllerHandler(categoryController.findFiltered));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
