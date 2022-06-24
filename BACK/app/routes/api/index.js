const { dirname } = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const ApiError = require('../../errors/apiError');

const loginRoutes = require('./auth/index');
const adminUserRoutes = require('./admin/index');
const customerRoute = require('./customer/index');

const authAdmin = require('../../middleware/admin');
// const authUser = require('../../middleware/user');

const router = express.Router();

const appDir = dirname(require.main.filename);
const publicPath = `${appDir}/public`;
console.log(`${__dirname}/public`);

router.use('/public', express.static(publicPath));

router.use('/login', loginRoutes);

router.use('/admin', authAdmin, adminUserRoutes);

router.use('/customer', customerRoute);

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});

module.exports = router;
