/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
const fs = require('fs');
const ApiError = require('../../errors/apiError');
const { pictureDataMapper, adminReferenceDataMapper } = require('../../models/admin');

module.exports = {
    async addPicture(req, res) {
        const {
            title,
            description,
            refId,
            main,
        } = req.body;
        // now url is not required title is use as this place
        const urlArray = req.file.path.split('/');
        const url = urlArray[urlArray.length - 1];

        // delete extension from picture name
        const titleArray = title.split('.');
        titleArray.pop();
        const cleanTitle = titleArray.join(' ');

        const obj = {
            url,
            title: cleanTitle,
            alternative_text: description,
            main,
        };
        // I create the picture
        const picture = await pictureDataMapper.addPicture(obj);
        if (!picture[0].id) {
            throw new ApiError(500, `erreur picture: ${picture[0].message}`);
        }
        // If the picture is the main picture, pass the other images in secondary
        if (main === 'true') {
            const secondary = await pictureDataMapper.passSecondary(refId, picture[0].id);
            if (secondary[0]) {
                throw new ApiError(500, `erreur: ${secondary[0].message}`);
            }
        }
        // I create the relation between the image and the reference
        const result = await pictureDataMapper.addRelation(refId, picture[0].id);
        // If the relation is created, return the picture info, else i return one error
        if (!result[0]) {
            res.json(picture).status(201);
        } else {
            throw new ApiError(500, `erreur relation: ${result[0].message}`);
        }
    },
    async deletePicture(req, res) {
        const { id } = req.params;
        // verify if picture exist
        const picture = await pictureDataMapper.getById(id);
        if (picture.length < 1) {
            throw new ApiError(404, 'L\'image demandé n\'existe pas');
        }
        // create the correct url for remove the picture
        const arrayUrl = picture[0].url.split('\\');
        const name = arrayUrl[arrayUrl.length - 1];
        const path = `${process.env.IMAGE_CATALOG_FOLDER}/${name}`;
        // try to remove the picture
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
        const obj = {};
        // If image is main, i pass other picture of this reference secondary
        if (main && main === true) {
            const secondary = await pictureDataMapper.passSecondary(picture[0].id_ref);
            if (secondary[0]) {
                throw new ApiError(500, `erreur: ${secondary[0].message}`);
            } else {
                obj.main = main;
            }
        }
        if (title) {
            obj.title = title;
        }
        if (description) {
            obj.alternative_text = description;
        }

        const newPicture = await pictureDataMapper.update(id, obj);
        res.json(newPicture);
    },
    async getForOneRef(req, res) {
        const { id } = req.params;
        const reference = await adminReferenceDataMapper.findOne(id);
        if (!reference.length) {
            throw new ApiError(404, 'référence inexistante');
        }
        const pictures = await pictureDataMapper.getForOneRef(id);

        // remplacer le nom de l'image par l'url complet avant l'envoi
        pictures.map((p) => p.url = `${req.protocol}://ludautisme.org/api${process.env.IMAGE_CATALOG_URL}/${p.url}`);

        // remplacer la clé alternative_text par une clé alt
        pictures.map((p) => {
            p.text = p.alternative_text;
            p.name = p.alternative_text;
            delete p.alternative_text;
            return p;
        });
        res.json(pictures);
    },
};
