const fs = require('fs');
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
        // I create the correct url for the front
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
    async deletePicture(req, res) {
        const { id } = req.params;
        // I verify if picture exist
        const picture = await pictureDataMapper.getById(id);
        if (picture.length < 1) {
            throw new ApiError(404, 'L\'image demandé n\'existe pas');
        }
        // I create the correct url for remove the picture
        const arrayUrl = picture[0].url.split('\\');
        const name = arrayUrl[arrayUrl.length - 1];
        const path = `../FRONT/public/${name}`;
        // I try to remove the picture
        try {
            fs.unlink(path, (async (err) => {
                if (err) {
                    throw new ApiError(500, err);
                } else {
                    // If the picture is delete i delete this way in database
                    const deletePict = await pictureDataMapper.deletePicture(id);
                    if (deletePict) {
                        res.json(`${name} a bien été supprimé`);
                    } else {
                        throw new ApiError(500, err);
                    }
                }
            }));
        } catch (err) {
            throw new ApiError(500, err);
        }
    },
    async updatePicture(req, res) {
        const { id } = req.params;
        const { title, description, main } = req.body;
        // I verify if picture exist and take this infos
        const picture = await pictureDataMapper.getById(id);
        if (picture.length < 1) {
            throw new ApiError(404, 'L\'image demandé n\'existe pas');
        }
        // If image is main, i pass other picture of this reference secondary
        if (main && main === 'true') {
            const secondary = await pictureDataMapper.passSecondary(picture[0].id_ref, id);
            if (secondary[0]) {
                throw new ApiError(500, `erreur: ${secondary[0].message}`);
            }
        }
        const obj = {
            title,
            alternative_text: description,
            main,
        };
        const newPicture = await pictureDataMapper.update(id, obj);
        res.json(newPicture);
    },
};
