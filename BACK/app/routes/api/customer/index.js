const express = require('express');

const referenceRouter = require('./reference');
const userRouter = require('./user');
const categoryRouter = require('./category');
const bookingRouter = require('./booking');
const permanencyRouter = require('./permanency');
const cartRouter = require('./cart');
const contactRouter = require('./contact');
const pictureFullPath = require('../../../middleware/pictureFullPath');
const favoriteRouter = require('./favorite');
const ApiError = require('../../../errors/apiError');

const router = express.Router();

router.use('/articles', pictureFullPath, referenceRouter);

router.use('/user', userRouter);

router.use('/category', categoryRouter);

router.use('/booking', pictureFullPath, bookingRouter);

router.use('/permanency', permanencyRouter);

router.use('/cart', cartRouter);

router.use('/favorite', pictureFullPath, favoriteRouter);

router.use('/contact', contactRouter);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
