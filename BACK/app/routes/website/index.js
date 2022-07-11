const { dirname } = require('path');
const express = require('express');
const ApiError = require('../../errors/apiError');

const router = express.Router();

// Serve React app

const appDir = dirname(require.main.filename);
const buildPath = `${appDir}/../FRONT/build`;

const getBuilPath = (req, res) => {
    const fixedPathsHost = ['ludautisme.fr'];
    return (fixedPathsHost.includes(req.get('host')))
        ? express.static('../FRONT/build')
        : express.static(buildPath);
};

router.use('/admin', getBuilPath);
router.use('/admin/*', getBuilPath);
router.use('/', getBuilPath);
router.use('/*', getBuilPath);

module.exports = router;
