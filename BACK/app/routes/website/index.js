const express = require('express');
const ApiError = require('../../errors/apiError');
const router = express.Router();

router.use(express.static('../../../../FRONT/build'));

module.exports = router;
