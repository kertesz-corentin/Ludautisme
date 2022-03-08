const express = require('express');

const { pictureController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const multer = require('../../../middleware/multer-config');

const router = express.Router();

/**
 * PUT api/admin/picture/:id
 * @summary Update one picture
 * @tags Picture
 * @param {number} request.params.id.required - ID of the picture to update
 * @returns {Picture} 201 - succes response - application/json
 */
/**
 * DELETE api/admin/picture/:id
 * @summary Delete one picture
 * @tags Picture
 * @param {number} request.params.id.required - ID of the picture tu update
 * @returns {} 200 - succes response - application/json
 */
router.route('/:id')
    // .put(controllerHandler(pictureController.updatePicture))
    .delete(controllerHandler(pictureController.deletePicture));

/**
 * POST api/admin/picture
 * @summary Add one picture to one article
 * @tags Picture
 * @param {ParamsCreatePicture} request.body.required
 * @return {Picture} 201 - create - application/json
 */
router.route('/')
    .post(controllerHandler(multer), controllerHandler(pictureController.addPicture));

module.exports = router;
