const express = require('express');
const { adminReferenceController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * GET api/admin/references
 * @summary Get all references for admin
 * @tags Reference
 * @return {[Reference]} 200 - success response - application/json
 */
router.route('/')
    .get(controllerHandler(adminReferenceController.getAll));
/**
 * GET api/admin/references/actives
 * @summary Get all active references for admin
 * @tags Reference
 * @return {[Reference]} 200 - success response - application/json
 */
router.route('/actives ')
    .get(controllerHandler(adminReferenceController.getActive));
module.exports = router;
