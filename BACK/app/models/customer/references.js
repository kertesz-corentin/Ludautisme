const sqlHandler = require('../../helpers/sqlHandler');
/**
 * @typedef {object} Reference
 * @property {number} id - Unique identifier
 * @property {string} name - Reference name
 * @property {string} description - Reference description
 * @property {number} valorisation - Price of the referrence
 * @property {string} mainCategory - main category of article
 * @property {array<string>} tag - Tag of reference
 */

module.exports = {
    async findAll() {
        const result = await sqlHandler(
            `SELECT
            r."id",
            r."name",
            r."description",
            r."valorisation",
            cat."name" AS mainCategory,
            json_agg(DISTINCT "category"."name") AS tag,
            json_agg(json_build_object (
                'id', "image"."id",
                'url', "image"."url",
                'title', "image"."title",
                'text', "image"."alternative_text",
                'main', "image"."main"
            )) AS "picture"
            FROM "reference" AS r
            JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
            JOIN "image" ON rti."id_image" = "image"."id"
            JOIN "category" AS cat ON r."main_category" = cat."id"
            JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
            JOIN "category" ON rtc."id_category" = "category"."id"
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name`,
        );
        return result.rows;
    },
    async findOne(id) {
        const result = await sqlHandler(
            `SELECT
            r.id,
            r.name,
            r.description,
            r.valorisation,
            cat.name AS mainCategory,
            json_agg(DISTINCT "category"."name") AS tag,
            json_agg(json_build_object (
                'id', "image"."id",
                'url', "image"."url",
                'name', "image"."title",
                'text', "image"."alternative_text",
                'main', "image"."main"
            )) AS "picture"
            FROM "reference" AS r
            LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
            LEFT JOIN "image" ON rti."id_image" = "image"."id"
            LEFT JOIN "category" AS cat ON r."main_category" = cat."id"
            LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
            LEFT JOIN "category" ON rtc."id_category" = "category"."id"
            LEFT JOIN "article" AS ar ON ar."id_ref" = r."id"
            WHERE r.id = $1
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name`,
            [id],
        );
        return result.rows;
    },
    async search(obj) {
        
    },
};
