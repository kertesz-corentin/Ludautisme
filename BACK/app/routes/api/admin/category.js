const express = require('express');
const { categorieController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * POST api/admin/categorie/reference/search
 * @summary Get category filtered
 * @tags Category
 * @param {Category} request.body.required At least one of these
 * @return {array<Category>} 200 - succes response - application/json
 */
router.route('/search')
    .post(controllerHandler(categorieController.findFiltered));
/**
 * PUT api/admin/categorie/:id
 * @summary Update one category
 * @tags Category
 * @param {number} request.params.id.required - Id of category
 * @param {ParamCreateCat} request.body.required - At least one of these
 * @return {Category} 200 - succes response - application/json
 */
/**
 * DELETE api/admin/categorie/:id
 * @summary Delete on category
 * @tags Category
 * @param {number} request.params.requires - Id of category
 * @return {Category} 200 - succes response - application/json
 */
router.route('/:id')
    .put(controllerHandler(categorieController.update))
    .delete(controllerHandler(categorieController.delete));
/**
 * GET api/admin/categorie
 * @summary Get all category
 * @tags Category
 * @return {array<Category>} 200 - succes response - application/json
 */
/**
 * POST api/admin/categorie
 * @summary Add new category
 * @tags Category
 * @param {ParamCreateCat} request.body.required - At least name
 * @return {Category} 200 - succes response - application/json
 */
router.route('/')
    .get(controllerHandler(categorieController.getAll))
    .post(controllerHandler(categorieController.addCategorie));

module.exports = router;
