module.exports = (req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}/api${process.env.IMAGE_CATALOG_FOLDER}/`;

    const old = res.json.bind(res);

    res.json = (body) => {
        const wrapFullUrlToPic = (pic) => ({ ...pic, ...{ url: `${fullUrl}${pic.url}` } });
        const data = (body.data) ? body.data : body;
        const bodyWithUrl = data.map(
            (ref) => ({ ...ref, ...{ picture: ref.picture.map(wrapFullUrlToPic)[0] } }),
        );
        console.log(bodyWithUrl);

        // Do whatever
        old(bodyWithUrl);
    };

    next();
};
