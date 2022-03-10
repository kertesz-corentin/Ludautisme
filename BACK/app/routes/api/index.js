const express = require('express');
const ApiError = require('../../errors/apiError');

const loginRoutes = require('./auth/index');
const adminUserRoutes = require('./admin/index');
const customerRoute = require('./customer/index');

const authAdmin = require('../../middleware/admin');
// const authUser = require('../../middleware/user');

const router = express.Router();

router.use('/login', loginRoutes);

router.use('/admin', authAdmin, adminUserRoutes);

router.use('/customer', customerRoute);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
