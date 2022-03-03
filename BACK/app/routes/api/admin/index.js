const express = require('express');

const userRouter = require('./users');
const referenceRouter = require('./reference');
const { ApiError } = require('../../../errors/apiError');

const router = express.Router();

router.use('/users', userRouter);
router.use('/references', referenceRouter);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
