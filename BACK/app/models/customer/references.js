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
        const result = await client.query('SELECT "reference"."id","reference"."name","reference"."description", "reference"."valorisation", json_agg(json_build_object (\'url\', "image"."url")) AS "url" FROM "reference" JOIN "reference_to_image" ON "reference"."id" = "reference_to_image"."id_ref" JOIN "image" ON "reference_to_image"."id_image" = "image"."id" GROUP BY "reference"."name", "reference"."description", "reference"."valorisation", "reference"."id"');
        return result.rows;
    },
};
