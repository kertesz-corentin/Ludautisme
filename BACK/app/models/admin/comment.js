/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} Comment
 * @property {number} id - Unique identifier
 * @property {number} id_article - id of article
 * @property {number} id_user - id of user
 * @property {string} created_at - date of creation
 * @property {string} comment - comment of article
 */
/**
 * @typedef {object} CommentCreate
 * @property {number} id_user - id of user
 * @property {string} comment - text of comment
 */
module.exports = {
    async findAll() {
        const query = 'SELECT * FROM "article_comment"';
        const result = await sqlHandler(query);
        return result.rows;
    },
    async getById(id) {
        const query = 'SELECT * FROM "article_comment" WHERE id=$1';
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async findByArticle(articleId) {
        const query = `
        SELECT 
        art_com.id,
        art_com.id_article,
        art_com.id_user,
        art_com.comment,
        art_com.created_at,
        art_com.validated,
        "user".first_name,
        "user".last_name
        FROM "article_comment" AS art_com
        INNER JOIN "user" ON "user"."id"=art_com."id_user"
        WHERE id_article=$1`;
        const placeholders = [articleId];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async deleteComment(id) {
        const query = 'DELETE FROM "article_comment" WHERE id=$1';
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async addComment(articleId, userId, comment) {
        const query = 'INSERT INTO "article_comment"("id_article","id_user","comment") VALUES ($1,$2,$3)';
        const placeholders = [articleId, userId, comment];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async validateComment(id) {
        const query = 'UPDATE "article_comment" SET "validated" = true WHERE id=$1';
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async update(id, obj) {
        const props = Object.keys(obj);
        let query = `UPDATE "article_comment" SET `;
        const placeholders = [];
        props.forEach((prop, index) => {
            placeholders.push(obj[prop]);
            if (index !== props.length - 1) {
                query += `${prop}=$${index + 1}, `;
            } else {
                query += `${prop}=$${index + 1} WHERE id=$${index + 2} RETURNING *`;
                placeholders.push(id);
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
};
