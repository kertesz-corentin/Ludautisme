const express = require('express');
const {userController} = require('../../../controllers')
const controllerHandler = require('../../../helpers/apiControllerHandler');
const router = express.Router();

    /**
     * GET /api/admin/users
     * @summary Get all users detailed informations
     * @tags Users
     * @return {users} 200 - success response - application/json
     */

router.route('/')
    .get(()=>{userController.getAll()});

module.exports = router;
