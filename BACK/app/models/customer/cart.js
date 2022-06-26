/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} cartRefList
 * @property {number} id - Cart's User Id
 * @property {array<number>} id_refs - Array of references id
 */

/**
 * @typedef {object} cartRefParams
 * @property {number} refId - Cart's User Id
 */

module.exports = {
    async findCartByUserId(id) {
        const query = `SELECT
        "user"."id",
        json_agg("reference_to_cart"."id_ref"
        ) AS id_refs
        FROM "user"
        INNER JOIN "reference_to_cart" ON "user"."id" = "reference_to_cart"."id_user"
        WHERE "user"."id"= $1
        GROUP BY "user"."id"`;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async findRefByUserId(userId, refId) {
        const query = `SELECT
        "user"."id",
        "reference_to_cart"."id_ref"
        FROM "user"
        INNER JOIN "reference_to_cart" ON "user"."id" = "reference_to_cart"."id_user"
        WHERE "user"."id"= $1 AND "reference_to_cart"."id_ref" = $2
        GROUP BY "user"."id","reference_to_cart"."id_ref"`;
        const placeholders = [userId, refId];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async countCart(userId) {
        const query = `SELECT COUNT (*) FROM "user"
        INNER JOIN "reference_to_cart" ON "user"."id" = "reference_to_cart"."id_user"
        WHERE "user"."id" = $1;`
        const placeholders = [userId];
        const result = await sqlHandler(query,placeholders);
        return result.rows;
    },
    async addRef(userId, refId) {
        const query = `INSERT INTO "reference_to_cart"("id_user","id_ref") VALUES($1,$2) RETURNING *`;
        const placeholders = [userId, refId];
        // Add item
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async deleteOne(userId, refId) {
        const query = `DELETE FROM "reference_to_cart" WHERE "reference_to_cart"."id_user" = $1 AND "reference_to_cart"."id_ref" = $2`;
        const placeholders = [userId, refId];
        sqlHandler(query, placeholders);
        return { answer: "Référence supprimée" };
    },

    async clear(userId) {
        const query = `DELETE FROM "reference_to_cart" WHERE "reference_to_cart"."id_user" = $1`;
        const placeholders = [userId];
        sqlHandler(query, placeholders);
        return { answer: "Panier supprimé" };
    },
};
