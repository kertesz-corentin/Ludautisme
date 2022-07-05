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
    async findAll(idUser) {
        const query = `SELECT
            fav."id_user",
            r."id",
            r."name",
            r."description",
            r."valorisation",
            cat."name" AS mainCategory,
            json_agg(DISTINCT jsonb_build_object(
                'id',"category"."id",
                'name',"category"."name"
                )) AS tag,
            COUNT(DISTINCT "article"."id") AS nb_total,
            COUNT(DISTINCT "article"."id") FILTER (WHERE "article"."available" = TRUE) AS nb_available,
            json_agg(DISTINCT jsonb_build_object (
                'id', "image"."id",
                'url', "image"."url",
                'title', "image"."title",
                'text', "image"."alternative_text",
                'main', "image"."main"
            )) AS "picture"
            FROM "favorite_user_to_reference" AS fav
            JOIN "reference" AS r ON fav."id_ref" = r."id"
            LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
            LEFT JOIN "image" ON rti."id_image" = "image"."id"
            JOIN "category" AS cat ON r."main_category" = cat."id"
            LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
            LEFT JOIN "category" ON rtc."id_category" = "category"."id"
            LEFT JOIN "article" ON "article"."id_ref" = "r"."id"
            WHERE fav."id_user" = $1
            GROUP BY fav.id_user, r.name, r.description, r.valorisation, r.id, cat.name`;
        const placeholders = [idUser];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async addRef(idUser, idRef) {
        const query = `INSERT INTO "favorite_user_to_reference"("id_user","id_ref") VALUES ($1,$2)
                        ON CONFLICT DO NOTHING
                        RETURNING (
                            SELECT json_agg(fav."id_ref")
                            FROM "favorite_user_to_reference" AS fav
                            WHERE fav."id_user" = $1
                            )`;
        const placeholders = [idUser, idRef];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
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
