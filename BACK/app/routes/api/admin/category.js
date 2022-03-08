const express = require('express');
const { categorieController } = require('');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * POST api/categorie/status
 * @summary Get category by status (main/secondary)
 * @tags Category
 * @param {string} request.body.required Status you want for filter
 * @return {array<string>} 200 - succes response - applucation/json
 */
router.route('/status')
    .post(controllerHandler(categorieController.getByStatus));
/**
 * POST api/categorie/reference
 * @summary Get all category of one reference
 * @tags Category
 * @param {}
 */
router.route('/reference')
    .post(controllerHandler(categorieController.getByRef));

router.route('/:id')
    .get(controllerHandler(categorieController.getOne))
    .put(controllerHandler(categorieController.update))
    .delete(controllerHandler(categorieController.delete));
router.route('/')
    .get(controllerHandler(categorieController.getAll))
    .post(controllerHandler(categorieController.addCategorie));

module.exports = router;
