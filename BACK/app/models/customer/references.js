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
                                            json_agg(json_build_object ('url', "image"."url")) AS "url"
                                            FROM "reference" AS r
                                            JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
                                            JOIN "image" ON rti."id_image" = "image"."id"
                                            GROUP BY r.name, r.description, r.valorisation, r.id`);
        return result.rows;
    },
};
