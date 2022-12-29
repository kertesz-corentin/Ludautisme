const express = require('express');
const ApiError = require('../../../errors/apiError');
const { pictureController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const multer = require('../../../middleware/multer-config');

const router = express.Router();

/**
 * PUT api/admin/picture/:id
 * @summary Update one picture
 * @tags [ADMIN] Picture
 * @param {number} request.params.id.required - ID of the picture to update
 * @param {ParamsUpdatePicture} request.body.required - At least one of these
 * @returns {Picture} 201 - succes response - application/json
 */
/**
 * DELETE api/admin/picture/:id
 * @summary Delete one picture
 * @tags [ADMIN] Picture
 * @param {number} request.params.id.required - ID of the picture tu update
 * @returns {string} 200 - succes response - application/json
 */
/**
 * GET api/admin/picture/:id
 * @summary get pictures of one reference
 * @tags [ADMIN] Picture
 * @param {number} request.params.id.required - ID of reference
 * @returns {Picture []} 200 - succes response - application/json
 */
router.route('/:id')
    .put(controllerHandler(pictureController.updatePicture))
    .delete(controllerHandler(pictureController.deletePicture))
    .get(controllerHandler(pictureController.getForOneRef));

/**
 * POST api/admin/picture
 * @summary Add one picture to one article
 * @tags [ADMIN] Picture
 * @param {ParamsCreatePicture} request.body.required
 * @return {Picture} 201 - create - application/json
 */
router.route('/')
    .post(controllerHandler(multer), controllerHandler(pictureController.addPicture));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
