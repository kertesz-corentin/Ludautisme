const express = require('express');
const { permanencyController } = require('../../../controllers/customer');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

router.route('/')
    .get(controllerHandler(permanencyController.getActive));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
