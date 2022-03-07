const { dirname } = require('path');
const express = require('express');
const ApiError = require('../../errors/apiError');
const router = express.Router();

//Serve React app
const appDir = dirname(require.main.filename);
const buildPath = `${appDir}/../FRONT/build`;
//END Serve React app
console.log(appDir);

router.use('/admin', express.static(buildPath));
router.use('/admin/*', express.static(buildPath));
router.use('/', express.static(buildPath));
router.use('/*', express.static(buildPath));

module.exports = router;
