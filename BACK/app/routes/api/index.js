const express = require('express');

const adminRouter = require('./admin');
//!const customerRouter = require('./customer');

const router = express.Router();

//!router.all('/',apiController.home);

router.use('/admin', adminRouter);
//!router.use('/customer', customerRouter);

router.use(()=>{
    throw new ApiError(404,'API Route not found');
});

module.exports = router;
