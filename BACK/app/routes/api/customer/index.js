const express = require('express');

const referenceRouter = require('./reference');
const userRouter = require('./user');
const categoryRouter = require('./category');
const bookingRouter = require('./booking');
const { ApiError } = require('../../../errors/apiError');


const router = express.Router();

router.use('/articles', referenceRouter);

router.use('/user', userRouter);

router.use('/category', categoryRouter);

router.use('/booking', bookingRouter);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
