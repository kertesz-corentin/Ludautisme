const client = require('../../config/db');

/**
 * @typedef {object} Reference
 * @property {number} id - Unique identifier
 * @property {string} name - Reference name
 * @property {string} description - Reference description
 * @property {number} valorisation - Price of the referrence
 * @property {array<Url>} url
 */
/** */
/**
 * @typedef {string} Url
 * @property {string} url - Url of reference image
 */
module.exports = {
    async findAll() {
        const result = await client.query(`SELECT
                                            r."id",
                                            r."name",
                                            r."description",
                                            r."valorisation",
                                            cat."name" AS mainCategory,
                                            json_agg(json_build_object ('url', "image"."url")) AS "url",
                                            json_agg("category"."name") AS tag
                                            FROM "reference" AS r
                                            LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
                                            LEFT JOIN "image" ON rti."id_image" = "image"."id"
                                            LEFT JOIN "category" AS cat ON r."id_category" = cat."id"
                                            LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
                                            LEFT JOIN "category" ON rtc."id_category" = "category"."id"
                                            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name`);
        return result.rows;
    },
};
