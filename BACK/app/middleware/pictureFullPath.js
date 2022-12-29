const ApiError = require('../errors/apiError');

module.exports = (req, res, next) => {
    const fullUrl = (process.env.IMAGE_PORT_REDIRECTION)
        ? `${req.protocol}://ludautisme.org/api${process.env.IMAGE_CATALOG_URL}/`
        : `${req.protocol}://ludautisme.org/api${process.env.IMAGE_CATALOG_URL}/`;

    const old = res.json.bind(res);

    res.json = (body) => {
        if (body.status === 'error' || !body.length) {
            old(body);
            return;
        }
        const bodyWrapped = () => {
            if (body[0].articles) {
                const wrapFullUrlToPic = (picUrl) => (`${fullUrl}${picUrl}`);
                return body.map(
                    (book) => ({
                        ...book,
                        articles: book.articles.map(
                            (art) => ({
                                ...art,
                                ...{ url_picture_ref: wrapFullUrlToPic(art.url_picture_ref) },
                            }),
                        ),
                    }),
                );
            }
            if (body[0].picture) {
                const wrapFullUrlToPic = (pic) => ({ ...pic, ...{ url: `${fullUrl}${pic.url}` } });
                return body.map(
                    (ref) => ({ ...ref, ...{ picture: ref.picture.map(wrapFullUrlToPic) } }),
                );
            }

            return body;
        };

        // Do whatever
        old(bodyWrapped());
    };

    next();
};
