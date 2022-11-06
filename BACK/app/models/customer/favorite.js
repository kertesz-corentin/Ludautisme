/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} cartRefList
 * @property {array<number>} ref_ids - Array of references id
 */

/**
 * @typedef {object} cartRefParams
 * @property {number} refId - Cart's User Id
 */

module.exports = {
    async findAll(idUser) {
        const query = `SELECT
            array_agg(fav."id_ref") AS "ref_ids"
            FROM "favorite_user_to_reference" AS fav
            WHERE fav."id_user" = $1;
            `;
        const placeholders = [idUser];
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async addRef(idUser, idRef) {
        const query = `INSERT INTO "favorite_user_to_reference"("id_user","id_ref") VALUES ($1,$2)
                        ON CONFLICT DO NOTHING
                        RETURNING *
                        `;
        const placeholders = [idUser, idRef];
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async deleteRef(idUser, idRef) {
        const query = `DELETE FROM "favorite_user_to_reference"
                        WHERE "favorite_user_to_reference"."id_user" = $1
                        AND "favorite_user_to_reference"."id_ref" = $2
                        RETURNING (
                            SELECT json_agg(fav."id_ref")
                            FROM "favorite_user_to_reference" AS fav
                            WHERE fav."id_user" = $1
                        )`;
        const placeholders = [idUser, idRef];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
};
