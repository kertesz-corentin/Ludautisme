const express = require('express');
const ApiError = require('../../../errors/apiError');
const { articleController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * GET /api/admin/articles/:id
 * @summary Get one article
 * @tags Article
 * @param {number} request.params.required - ID of the article
 * @return {Article} 200 - success response - application/json
 */
/**
 * PUT /api/admin/articles/:id
 * @summary Update one article
 * @tags Article
 * @param {number} request.params.required - ID of the article
 * @return {Article} 200 - success response - application/json
 */
router.route('/:id')
    .get(controllerHandler(articleController.getOne))
    .put(controllerHandler(articleController.update));
/**
 * POST /api/admin/articles/search
 * @summary Get article filtered
 * 
 */
router.route('/search')
    .post(controllerHandler(articleController.getFiltered));

/**
 * GET /api/admin/articles
 * @summary Get all articles
 * @tags Article
 * @return {Article} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(articleController.getAll));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
