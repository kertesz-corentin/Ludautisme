const express = require('express');
const { bookingReferenceController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

router.route('/')
      .get(controllerHandler(bookingReferenceController.getAll));

module.exports = router;
