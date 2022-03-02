const express = require('express');

const { referenceController } = require('../../../controllers');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();
console.log(referenceController);
/**
     * GET api/user/articles
     * @summary Get all references with picture
     * @tags Reference
     * @return {[Reference]} 200 - success response - application/json
     */
router.get('/', (req, res) => res.json('coucou'));
