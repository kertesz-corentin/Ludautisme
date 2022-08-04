const { dirname } = require('path');
const express = require('express');
const ApiError = require('../../errors/apiError');

const router = express.Router();

// Serve React app

const appDir = dirname(require.main.filename);
const buildPath = (process.env.NODE_ENV === 'production') ? '../FRONT/build' : `${appDir}/../FRONT/build`;

router.use('/admin', express.static(buildPath));
router.use('/admin/*', express.static(buildPath));
router.use('/', express.static(buildPath));
router.use('/*', express.static(buildPath));

module.exports = router;
