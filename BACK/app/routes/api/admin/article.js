const express = require('express');
const ApiError = require('../../../errors/apiError');
const { articleController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * GET /api/admin/articles/:id
 * @summary Get one article
 * @tags [ADMIN] Article
 * @param {number} request.params.required - ID of article
 * @return {Article} 200 - success response - application/json
 */
/**
 * PUT /api/admin/articles/:id
 * @summary Update one article
 * @tags [ADMIN] Article
 * @param {number} request.params.required - ID of article
 * @param {ParamArticleCreate} request.body.required - At least one of these
 * @return {Article} 200 - success response - application/json
 */
router.route('/:id')
    .get(controllerHandler(articleController.getOne))
    .put(controllerHandler(articleController.updateArticle));
/**
 * POST /api/admin/articles/search
 * @summary Get article filtered
 * @tags [ADMIN] Article
 * @param {paramSearchBooking} request.body.required - At least one of these
 * @return {array<BookingArticles>} 200 - success response - application/json
 */
router.route('/search')
    .post(controllerHandler(articleController.getFiltered));
/**
 * GET /api/admin/articles/comment/
 * @summary geta all comment not validated
 * @tags [ADMIN] Comment
 * @return {Comment} 200 - success response - application/json
 */
router.route('/comment/novalid')
    .get(controllerHandler(articleController.getAllNoValidatedComment));
/**
 * GET /api/admin/articles/comment/:id
 * @summary get all comments for one article
 * @tags [ADMIN] Comment
 * @param {number} request.params.required - ID of article
 * @return {Comment[]} 200 - success response - application/json
 */
/**
 * POST /api/admin/articles/comment/:id
 * @summary add on comment to one article
 * @tags [ADMIN] Comment
 * @param {number} request.params.id - ID of article
 * @param {CommentCreate} request.body.required - All required
 * @return {Comment} 200 - success response - application/json
 */
/**
 * DELETE /api/admin/articles/comment/:id
 * @summary delete one comment from article
 * @tags [ADMIN] Comment
 * @param {number} request.parmas.id - ID of comment
 * @return {Comment} 200 - success response - application/json
 */
/**
 * PUT /api/admin/articles/comment/:id
 * @summary update one comment
 * @tags [ADMIN] Comment
 * @param {number} request.params.id - ID of comment
 * @return {Comment} 200 - success response - application/json
 */
/**
 * PATCH /api/admin/articles/comment/:id
 * @summary valid or delete user comment and send a confirm mail
 * @tags [ADMIN] Comment
 * @param {number} request.params.id - ID of comment
 * @param {string} request.body.message - message for the user
 * @param {string} request.body.type - type of action "delete" or "valid" available
 * @return {Comment} 200 - success response - application/json
 */
router.route('/comment/:id')
    .get(controllerHandler(articleController.getComment))
    .post(controllerHandler(articleController.addComment))
    .delete(controllerHandler(articleController.deleteComment))
    .put(controllerHandler(articleController.update))
    .patch(controllerHandler(articleController.userComment));
/**
 * GET /api/admin/articles/status/:articleId
 * @summary get status of one article
 * @tags [ADMIN] Article
 * @param {number} request.params.articleId.required - ID of article
 * @return 200 - success response - application/json
 */
router.route('/status/:articleId')
    .get(controllerHandler(articleController.getStatus));
/**
 * GET /api/admin/articles
 * @summary Get all articles
 * @tags [ADMIN] Article
 * @return {Article} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(articleController.getAll));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
