const express = require('express');
const { bookingController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

router.route('/')
    .get(controllerHandler(bookingController.getAll));

module.exports = router;
