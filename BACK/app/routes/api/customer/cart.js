const express = require('express');
const { cartController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

router.route('/:id')
    .get(controllerHandler(cartController.getCart));

router.route('/add/:id')
    .post(controllerHandler(cartController.addToCart));

module.exports = router;
