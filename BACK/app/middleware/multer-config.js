/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
const path = require('path');
const multer = require('multer');
const ApiError = require('../errors/apiError');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};
// We decide where multer will store the photos and how he will name them
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '../FRONT/public/pictures');
    },
    filename(req, file, cb) {
        const name = file.originalname.split(' ').join('_');
        const nameWithoutExt = path.parse(name).name;
        console.log(nameWithoutExt);
        const extension = MIME_TYPES[file.mimetype];
        cb(null, `${nameWithoutExt + Date.now()}.${extension}`);
    },
});

module.exports = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new ApiError(401, 'Seul les formats .png, .jpg, .jpeg et .webp sont accepté'));
        }
    },
}).single('picture');
