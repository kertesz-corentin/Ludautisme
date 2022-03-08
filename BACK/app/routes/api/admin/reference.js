const express = require('express');

const { referenceController, pictureController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const multer = require('../../../middleware/multer-config');

const router = express.Router();

/**
 * POST api/admin/references/picture
 * @summary Add one picture to one article
 * @tags Picture
 * @param {ParamsCreatePicture} request.body.required
 * @return {Picture} 201 - create - application/json
 */
router.route('/picture')
    .post(controllerHandler(multer), controllerHandler(pictureController.addPicture));
/**
 * POST api/admin/references/article
 * @summary Add one article to reference
 * @tags Reference
 * @param {ParamArticleCreate} request.body.required At least number and id_ref
 * @return {Article} 201 - success response - application/json
 */
router.route('/article')
    .post(controllerHandler(referenceController.addArticle));
/**
 * GET api/admin/references/actives
 * @summary Get all active references for admin
 * @tags Reference
 * @return {[Reference]} 200 - success response - application/json
 */
router.route('/active')
    .get(controllerHandler(referenceController.getActive));
/**
 * GET api/admin/references/:id
 * @summary Get one reference with this articles
 * @tags Reference
 * @return {allOf|Reference|Pictures|Articles} 200 - success response - application/json
 */
/**
 * PUT api/admin/references/:id
 * @summary Update on reference
 * @tags Reference
 * @param {number} request.params.id.required - Id of the reference to update
 * @param {paramRefCreate} request.body.required - At least one of these
 * @returns {RefUpdate} 201 - succes response - application/json
 */
router.route('/:id')
    .get(controllerHandler(referenceController.getOne))
    .put(controllerHandler(referenceController.update));
/**
 * GET api/admin/references
 * @summary Get all references for admin
 * @tags Reference
 * @return {[Reference]} 200 - success response - application/json
 */
/**
 * POST api/admin/references
 * @summary Create a new reference
 * @tags Reference
 * @param {paramRefCreate} request.body.required - At least name
 * @return {Reference} 201 - succes response - application/json
 */
router.route('/')
    .get(controllerHandler(referenceController.getAll))
    .post(controllerHandler(referenceController.addRef));

module.exports = router;
