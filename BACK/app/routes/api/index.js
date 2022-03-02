const express = require('express');
const ApiError = require('../../errors/apiError');

const loginRoutes = require('./auth/index');
const adminUserRoutes = require('./admin/users');
const userRoute = require('./customer/user');
const authAdmin = require('../../middleware/admin');
// !const customerRouter = require('./customer');

const router = express.Router();

router.use('/login', loginRoutes);
// !router.all('/',apiController.home);
router.use('/user', userRoute);

router.use('/admin/users', authAdmin, adminUserRoutes);
// !router.use('/customer', customerRouter);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
