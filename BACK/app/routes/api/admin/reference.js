const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { adminReferenceController, pictureController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage});
const router = express.Router();

/**
 * POST api/admin/references/picture
 * @summary Add one picture to one article
 * @tags Picture
 */
router.route('/picture')
    .post(upload.single('userFile'), controllerHandler(pictureController.addPicture));
/**
 * POST api/admin/references/article
 * @summary Add one article to reference
 * @tags Reference
 * @param {ParamArticleCreate} request.body.required At least ref_number and id_ref
 * @return {Article} 201 - success response - application/json
 */
router.route('/article')
    .post(controllerHandler(adminReferenceController.addArticle));
/**
 * GET api/admin/references/actives
 * @summary Get all active references for admin
 * @tags Reference
 * @return {[Reference]} 200 - success response - application/json
 */
router.route('/active')
    .get(controllerHandler(adminReferenceController.getActive));
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
    .get(controllerHandler(adminReferenceController.getOne))
    .put(controllerHandler(adminReferenceController.update));
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
    .get(controllerHandler(adminReferenceController.getAll))
    .post(controllerHandler(adminReferenceController.addRef));

module.exports = router;
