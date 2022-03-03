const express = require('express');

const referenceRouter = require('./reference');
const userRouter = require('./user');
const { ApiError } = require('../../../errors/apiError');

const router = express.Router();

router.use('/articles', referenceRouter);

router.use('/', userRouter);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
