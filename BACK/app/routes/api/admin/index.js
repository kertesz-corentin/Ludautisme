const express = require('express');

const pictureRouter = require('./picture');
const userRouter = require('./users');
const referenceRouter = require('./reference');
const bookingRouter = require('./booking');
const permanencyRouter = require('./permanency');
const articleRouter = require('./article');
const categorieRouter = require('./category');
const { ApiError } = require('../../../errors/apiError');

const router = express.Router();

router.use('/categorie', categorieRouter);
router.use('/picture', pictureRouter);
router.use('/users', userRouter);
router.use('/references', referenceRouter);
router.use('/booking', bookingRouter);
router.use('/permanency', permanencyRouter);
router.use('/articles', articleRouter);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
