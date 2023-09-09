/* eslint-disable max-len */
const express = require('express');
const ApiError = require('../../../errors/apiError');
const { referenceController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * POST /api/customer/articles/search
 * @summary Get all ref filtered and paginate
 * @tags [CUSTOMER] Reference
 * @param {ParamSearchReference} request.body.required - At least page, limit and one of the three other
 * @returns {allOf|Reference|Pictures} 200 - succes response - application/json
 */
router.route('/search')
    .post(controllerHandler(referenceController.search));

/**
 * GET /api/customer/articles/namelist
 * @summary Get list of all references name and id
 * @tags [CUSTOMER] Reference
 * @returns {object} 200 - success response - application/json
 */
router.route('/namelist')
    .get(controllerHandler(referenceController.getNameList));

/**
 * GET /api/customer/articles/single/:id
 * @summary Get One reference with picture
 * @tags [CUSTOMER] Reference
 * @returns {allOf|Reference|Stock|Pictures} 200 - success response - application/json
 */
router.route('/single/:id')
    .get(controllerHandler(referenceController.getOne));
/**
 * GET api/admin/references/article/:number
 * @summary Get reference by article number
 * @tags [ADMIN] Reference
 * @param {number} request.params.id.required Article number
 * @return {[Reference]}
 */
router.route('/article/:number')
    .get(controllerHandler(referenceController.getOneByArticleNumber));
/**
* GET /api/customer/articles
* @summary Get all references with picture
* @tags [CUSTOMER] Reference
* @return {allOf|Reference|Pictures} 200 - success response - application/json
*/
router.route('/')
    .get(controllerHandler(referenceController.getAll));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
