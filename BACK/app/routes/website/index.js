const { dirname } = require('path');
const express = require('express');
const ApiError = require('../../errors/apiError');

const router = express.Router();

// Serve React app

const appDir = dirname(require.main.filename);
const buildPath = `${appDir}/../FRONT/build`;

const getBuildPath = (req, res, next) => {
    const fixedPathsHost = ['ludautisme.fr'];
    console.error(fixedPathsHost.includes(req.get('host')), req.get('host'));
    fixedPathsHost.includes(req.get('host'))
        ? express.static('../FRONT/build')
        : express.static(buildPath);
    next();
};

router.use('/admin', getBuildPath);
router.use('/admin/*', getBuildPath);
router.use('/', getBuildPath);
router.use('/*', getBuildPath);

module.exports = router;
