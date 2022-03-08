const ApiError = require('../../../errors/apiError');

const pictureDataMapper = require('../../../models/admin/picture');

module.exports = {
    async addPicture(req, res) {
        res.json(`${req.file.originalname} uploadé`);
    },
};
