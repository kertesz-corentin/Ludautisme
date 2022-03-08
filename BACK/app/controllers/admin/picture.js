const ApiError = require('../../errors/apiError');
const { pictureDataMapper } = require('../../models/admin');

module.exports = {
    async addPicture(req, res) {
        const {
            title,
            description,
            refId,
            main,
        } = req.body;
        const oldUrl = req.file.path.split('/');
        const filteredUrl = oldUrl.filter((value) => value !== 'FRONT');
        const url = filteredUrl.join('/');
        const obj = {
            url,
            title,
            alternative_text: description,
            main,
        };
        // I create the picture
        const picture = await pictureDataMapper.addPicture(obj);
        // If the picture is the main picture, i pass the other images in secondary
        if (main === 'true') {
            const secondary = await pictureDataMapper.passSecondary(refId, picture[0].id);
            if (secondary[0]) {
                throw new ApiError(500, `erreur: ${secondary[0].message}`);
            }
        }
        // I create the relation between the image and the reference
        const result = await pictureDataMapper.addRelation(refId, picture[0].id);
        // If the relation is created, i return the picture info, else i return one error
        if (!result[0]) {
            res.json(picture).status(201);
        } else {
            throw new ApiError(500, `erreur: ${result[0].message}`);
        }
    },
};
