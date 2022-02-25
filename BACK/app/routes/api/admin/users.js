const express = require('express');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const router = express.Router();

router.get('/',controllerHandler(controller.getAll));

module.exports = router;
