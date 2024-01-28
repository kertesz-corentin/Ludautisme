const sqlHandler = require('../../helpers/sqlHandler');

module.exports = {
    async findAll() {
        const query = 'SELECT * FROM "article_comment"';
        const result = await sqlHandler(query);
        return result.rows;
    },
    async addComment(articleId, userId, comment) {
        const query = 'INSERT INTO "article_comment"("id_article","id_user","comment") VALUES ($1,$2,$3)';
        const placeholders = [articleId, userId, comment];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
};
