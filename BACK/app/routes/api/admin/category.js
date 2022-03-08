const express = require('express');
const { categorieController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * POST api/admin/categorie/status
 * @summary Get category by status (main/secondary)
 * @tags Category
 * @param {string} request.body.required Status you want for filter
 * @return {array<Category>} 200 - succes response - application/json
 */
/* router.route('/status')
    .post(controllerHandler(categorieController.getByStatus)); */
/**
 * POST api/admin/categorie/reference
 * @summary Get all category of one reference
 * @tags Category
 * @param {number} request.body.required ID of the parent reference
 * @return {array<Category>} 200 - succes response - application/json
 */
/* router.route('/reference')
    .post(controllerHandler(categorieController.getByRef)); */
/**
 * GET api/admin/categorie/:id
 * @summary Get on category
 * @tags Category
 * @param {number} request.params.id.required - Id of category
 * @return {Category} 200 - succes response - application/json
 */
/**
 * PUT api/admin/categorie/:id
 * @summary Update one category
 * @tags Category
 * @param {number} request.params.id.required - Id of category
 * @return {Category} 200 - succes response - application/json
 */
/**
 * DELETE api/admin/categorie/:id
 * @summary Delete on category
 * @tags Category
 * @param {number} 200 - succes response - application/json
 * @return {string} 200 - succes response - application/json
 */
/* router.route('/:id')
    .get(controllerHandler(categorieController.getOne))
    .put(controllerHandler(categorieController.update))
    .delete(controllerHandler(categorieController.delete)); */
/**
 * GET api/admin/categorie
 * @summary Get all category
 * @tags Category
 * @return {array<Category>} 200 - succes response - application/json
 */
/**
 * POST api/admin/categorie
 * @summary Add nex category
 * @tags Category
 * @param {ParamCreateCat} request.body.required - At least name
 * @return {Category} 200 - succes response - application/json
 */
router.route('/')
    .get(controllerHandler(categorieController.getAll))
    .post(controllerHandler(categorieController.addCategorie));

module.exports = router;
