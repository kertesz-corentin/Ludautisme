const express = require('express');
const { permanencyController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

router.route('/')
    .get(controllerHandler(permanencyController.getAll));

router.route('/active')
    .get(controllerHandler(permanencyController.getActive));

router.route('/active/close')
    .get(controllerHandler(permanencyController.closeActive));

router.route('/next')
    .post(controllerHandler(permanencyController.setDateNext));

module.exports = router;
