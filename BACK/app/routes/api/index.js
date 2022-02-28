const express = require('express');

const adminUserRoutes = require('./admin/users');
//!const customerRouter = require('./customer');

const router = express.Router();

//!router.all('/',apiController.home);

router.use('/admin/users', adminUserRoutes);
//!router.use('/customer', customerRouter);

router.use(()=>{
    throw new ApiError(404,'API Route not found');
});

module.exports = router;
