const client = require('../../config/db');

/**
 * @typedef {object} Article
 * @property {number} id - Unique identifier
 * @property {number} ref_number - Physique code of object
 * @property {string} origin - Origin of object
 * @property {string} date_buy - Date of the object is buy
 * @property {boolean} available - If the object is available for booking
 * @property {boolean} archived - If the object is archived
 * @property {string} created_at - Date of the registration in DB
 */
/**
 * @typedef {object} Articles
 * @property {array<Article>} article - One article of the reference
 */
module.exports = {
    async findAll() {
        const result = await client.query(`
        SELECT
        r.id,
        r.name,
        r.description,
        r.valorisation,
        cat.name AS mainCategory,
        json_agg("category"."name") AS tag
        FROM "reference" AS r
        LEFT JOIN "category" AS cat ON r."id_category" = cat."id"
        LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        LEFT JOIN "category" ON rtc."id_category" = "category"."id"
        GROUP BY r.name, r.description, r.valorisation, r.id, cat.name
        `);
        return result.rows;
    },
    async findActive() {
        const result = await client.query(`
        SELECT
        r.id,
        r.name,
        r.description,
        r.valorisation,
        cat.name AS mainCategory,
        json_agg("category"."name") AS tag
        FROM "reference" AS r
        LEFT JOIN "category" AS cat ON r."id_category" = cat."id"
        LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        LEFT JOIN "category" ON rtc."id_category" = "category"."id"
        LEFT JOIN "article" ON "article"."id_ref" = r."id"
        WHERE "article"."available" = true AND "article"."archived" = false
        GROUP BY r.name, r.description, r.valorisation, r.id, cat.name
        `);
        return result.rows;
    },
    async findOne(id) {
        const result = await client.query(
            `SELECT
            r.id,
            r.name,
            r.description,
            r.valorisation,
            cat.name AS mainCategory,
            json_agg("category"."name") AS tag,
            json_agg(json_build_object ('url', "image"."url")) AS "url",
            json_agg(json_build_object (
                'id', ar."id",
                'ref_number', ar."ref_number",
                'origin', ar."origin",
                'date_buy', ar."date_buy",
                'available', ar."available",
                'archived', ar."archived",
                'created_at', ar."created_at"
                )) AS "articles"
            FROM "reference" AS r
            LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
            LEFT JOIN "image" ON rti."id_image" = "image"."id"
            LEFT JOIN "category" AS cat ON r."id_category" = cat."id"
            LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
            LEFT JOIN "category" ON rtc."id_category" = "category"."id"
            LEFT JOIN "article" AS ar ON ar."id_ref" = r."id"
            WHERE r.id = $1
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name`,
            [id],
        );
        return result.rows;
    },
};
