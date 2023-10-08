const sqlHandler = require('../../helpers/sqlHandler');

module.exports = {
    async findAll() {
        const query = 'SELECT * FROM "article_comment"';
        const result = await sqlHandler(query);
        return result.rows;
    },
};
