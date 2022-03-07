const express = require('express');
const { articleController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

router.route('/')
    .get(controllerHandler(articleController.getAll));

module.exports = router;
