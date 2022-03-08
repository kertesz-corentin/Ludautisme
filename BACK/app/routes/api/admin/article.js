const express = require('express');
const { articleController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

router.route('/')
    .get(controllerHandler(articleController.getAll));

router.route('/:id')
    .get(controllerHandler(articleController.getOne));

router.route('/search')
    .post(controllerHandler(articleController.getFiltered));

module.exports = router;
