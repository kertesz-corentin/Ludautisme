const express = require('express');
const controllerHandler = require('../../../helpers/apiControllerHandler');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.route('/')
    .get((req,res)=>{res.send('coucou');});

module.exports = router;
