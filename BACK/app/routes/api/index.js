const express = require('express');
const ApiError = require('../../errors/apiError');

const adminUserRoutes = require('./admin/users');
const userRoute = require('./user/user');
// !const customerRouter = require('./customer');

const router = express.Router();

// !router.all('/',apiController.home);
router.use('/user', userRoute);

router.use('/admin/users', adminUserRoutes);
// !router.use('/customer', customerRouter);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
