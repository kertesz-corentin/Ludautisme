const { dirname } = require('path');
const express = require('express');
const ApiError = require('../../errors/apiError');

const router = express.Router();

// Serve React app

const getBuildPath = (req) => {
    const appDir = dirname(require.main.filename);
    const fixedPathsHost = ['ludautisme.fr'];
    console.error('testo', fixedPathsHost.includes(req.get('host')), req.get('host'));
    const buildPath = (fixedPathsHost.includes(req.get('host')))
        ? `${appDir}/../FRONT/build`
        : '../FRONT/build';
    express.static(buildPath);
};

router.use('/admin', getBuildPath);
router.use('/admin/*', getBuildPath);
router.use('/', getBuildPath);
router.use('/*', getBuildPath);

module.exports = router;
