const express = require('express');
const userRouter = ('./users');
const router = express.Router();

router.use('/users',userRouter);

router.use(()=>{
    throw new ApiError(404,'API Route not found');
});

module.exports = router;


