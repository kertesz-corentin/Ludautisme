const express = require('express');
const { adminReferenceController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * GET api/
 */
router.route('/')
    .get(controllerHandler(adminReferenceController.getAll));

module.exports = router;
