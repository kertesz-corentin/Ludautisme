const express = require('express');
const ApiError = require('../../../errors/apiError');
const { referenceController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * POST api/user/articles/search
 * @summary Get all ref filtered and paginate
 * @tags Reference
 * @param
 * @returns {allOf|Reference|Pictures} 200 - succes response - application/json
 */
router.route('/search')
    .post(controllerHandler(referenceController.search));
/**
 * GET api/user/articles/:id
 * @summary Get One reference with picture
 * @tags Reference
 * @returns {allOf|Reference|Pictures} 200 - success response - application/json
 */
router.route('/:id')
    .get(controllerHandler(referenceController.getOne));
/**
* GET api/user/articles
* @summary Get all references with picture
* @tags Reference
* @return {allOf|Reference|Pictures} 200 - success response - application/json
*/
router.route('/')
    .get(controllerHandler(referenceController.getAll));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
