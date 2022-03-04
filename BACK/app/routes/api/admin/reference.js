const express = require('express');
const { adminReferenceController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

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
router.route('/:id')
    .get(controllerHandler(adminReferenceController.getOne));
/**
 * GET api/admin/references
 * @summary Get all references for admin
 * @tags Reference
 * @return {[Reference]} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(adminReferenceController.getAll));

module.exports = router;
