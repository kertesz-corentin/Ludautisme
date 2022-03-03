/* eslint-disable quotes */
/* eslint-disable consistent-return */
const client = require('../../config/db');
const { ApiError } = require('../../helpers/apiControllerHandler');

module.exports = {
    async getUserWithToken(email) {
        const query = 'SELECT * FROM "user" LEFT JOIN "temptoken" ON "user"."email" = "temptoken"."email_user" WHERE "user"."email"=$1';
        const result = await client.query(query, [email]);
        return result.rows[0];
    },
    async addToken(email, token) {
        const query = 'INSERT INTO "temptoken" (email_user,temptoken) VALUES ($1,$2) RETURNING *';
        const placeholders = [email, token];
        const result = await client.query(query, placeholders);
        return result.rows[0];
    },
    async resetUserTempToken(email) {
        const query = 'DELETE FROM "temptoken" WHERE email_user=$1';
        const placeholders = [email];
        await client.query(query, placeholders);
    },
};
