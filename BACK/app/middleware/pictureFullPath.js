const { isNativeError } = require('util/types');
const ApiError = require('../errors/apiError');

module.exports = (req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}/api${process.env.IMAGE_CATALOG_FOLDER}/`;

    const old = res.json.bind(res);

    res.json = (body) => {
        const wrapFullUrlToPic = (pic) => ({ ...pic, ...{ url: `${fullUrl}${pic.url}` } });

        if (body.status === 'error' || !body.length) {
            old(body);
            next();
            return;
        }
        const bodyWrapped = (body[0].picture)
            ? body.map(
                (ref) => ({ ...ref, ...{ picture: ref.picture.map(wrapFullUrlToPic) } }),
            )
            : body;

        // Do whatever
        old(bodyWrapped);
    };

    next();
};
