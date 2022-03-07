const ApiError = require('../../../errors/apiError');

const pictureDataMapper = require('../../../models/admin/picture');

module.exports = {
    async addPicture(req, res) {
        console.log(req.file.originalname);
        console.log(req.body);
    },
};
