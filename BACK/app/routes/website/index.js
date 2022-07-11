const { dirname } = require('path');
const express = require('express');
const ApiError = require('../../errors/apiError');

const router = express.Router();

// Serve React app

const appDir = dirname(require.main.filename);
const buildPath = (process.env.REACT_BUILD_FOLDER) ? process.env.REACT_BUILD_FOLDER : `${appDir}/../FRONT/build`;
console.error('REACT BUILPATH', buildPath, process.env.REACT_BUILD_FOLDER);

router.use('/admin', express.static(buildPath));
router.use('/admin/*', express.static(buildPath));
router.use('/', express.static(buildPath));
router.use('/*', express.static(buildPath));

module.exports = router;
