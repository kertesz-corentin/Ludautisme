/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

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
        console.log(result.rows);
        return result.rows;
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
        console.log("refFound", result.rows);
        return result.rows;
    },
    async addRef(userId, refId) {
        const query = `INSERT INTO "reference_to_cart"("id_user","id_ref") VALUES($1,$2) RETURNING *`;
        const placeholders = [userId, refId];
        // Add item
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },

    async clear(userId) {
        const query = `DELETE FROM "reference_to_cart" `;
        const placeholders = [userId];
        sqlHandler(query, placeholders);
        return { answer: "Panier supprimé" };
    }
};
