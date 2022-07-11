const { dirname } = require('path');
const express = require('express');
const ApiError = require('../../errors/apiError');

const router = express.Router();

// Serve React app

const appDir = dirname(require.main.filename);
const buildPath = `${appDir}/../FRONT/build`;

const getBuildPath = (req, res) => {
    const fixedPathsHost = ['ludautisme.fr'];
    return (fixedPathsHost.includes(req.get('host')))
        ? '../FRONT/build'
        : buildPath;
};

router.use('/admin', express.static(getBuildPath()));
router.use('/admin/*', express.static(getBuildPath()));
router.use('/', express.static(getBuildPath()));
router.use('/*', express.static(getBuildPath()));

module.exports = router;
