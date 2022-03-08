const express = require('express');

const { referenceController } = require('../../../controllers/api/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
 * GET api/user/articles/:id
 * @summary Get One reference with picture
 * @tags Reference
 * @returns {allOf|Reference|Pictures} 200 - success response - application/json
 */
router.route('/:id')
    .get(controllerHandler(referenceController.getOne));
/**
     * GET api/user/articles
     * @summary Get all references with picture
     * @tags Reference
     * @return {allOf|Reference|Pictures} 200 - success response - application/json
     */
router.route('/')
    .get(controllerHandler(referenceController.getAll));

module.exports = router;
