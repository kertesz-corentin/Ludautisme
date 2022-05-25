const express = require('express');
const { cartController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

router.route('/:id')
    .get(controllerHandler(cartController.getCart))
    .delete(controllerHandler(cartController.clear));

router.route('/add/:id')
    .post(controllerHandler(cartController.addToCart));

router.route('/delete/:id')
    .delete(controllerHandler(cartController.delete));

module.exports = router;
