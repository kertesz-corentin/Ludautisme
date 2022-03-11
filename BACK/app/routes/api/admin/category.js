const express = require('express');
const ApiError = require('../../../errors/apiError');
const { categorieController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * POST api/admin/categorie/search
 * @summary Get category filtered
 * @tags [ADMIN] Category
 * @param {Category} request.body.required At least one of these
 * @return {array<Category>} 200 - succes response - application/json
 */
router.route('/search')
    .post(controllerHandler(categorieController.findFiltered));
/**
 * PUT api/admin/categorie/:id
 * @summary Update one category
 * @tags [ADMIN] Category
 * @param {number} request.params.id.required - Id of category
 * @param {ParamCreateCat} request.body.required - At least one of these
 * @return {Category} 200 - succes response - application/json
 */
/**
 * DELETE api/admin/categorie/:id
 * @summary Delete on category
 * @tags [ADMIN] Category
 * @param {number} request.params.requires - Id of category
 * @return {Category} 200 - succes response - application/json
 */
router.route('/:id')
    .put(controllerHandler(categorieController.update))
    .delete(controllerHandler(categorieController.delete));
/**
 * GET api/admin/categorie
 * @summary Get all category
 * @tags [ADMIN] Category
 * @return {array<Category>} 200 - succes response - application/json
 */
/**
 * POST api/admin/categorie
 * @summary Add new category
 * @tags [ADMIN] Category
 * @param {ParamCreateCat} request.body.required - At least name
 * @return {Category} 200 - succes response - application/json
 */
router.route('/')
    .get(controllerHandler(categorieController.getAll))
    .post(controllerHandler(categorieController.addCategorie));
router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;
