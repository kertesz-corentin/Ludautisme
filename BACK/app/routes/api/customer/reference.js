const express = require('express');

const { userReferenceController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
/**
     * GET api/user/articles
     * @summary Get all references with picture
     * @tags Reference
     * @return {allOf|Reference|Pictures} 200 - success response - application/json
     */
router.route('/')
    .get(controllerHandler(userReferenceController.getAll));

module.exports = router;
