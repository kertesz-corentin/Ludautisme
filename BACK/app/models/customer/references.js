/* eslint-disable comma-dangle */
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
/**
 * @typedef {object} ParamSearchReference
 * @property {number} page - Number of the page
 * @property {number} limit - Limit of reference by page
 * @property {array<number>} categories - List of main categorie ID
 * @property {array<number>} tags - List of tags ID
 * @property {array<boolean>} available - If the references is avalaible
 */
/**
 * @typedef {object} Stock
 * @property {number} stock - Number of available article for this reference
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
            json_agg(DISTINCT jsonb_build_object (
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
            COUNT (ar."id") FILTER (WHERE ar.available =true) AS "stock",
            json_agg(DISTINCT jsonb_build_object (
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
    async findFiltered(arr, offset, limit) {
        let queryStart = `SELECT
        r.id,
        r.name,
        r.description,
        r.valorisation,
        cat.name AS mainCategory,
        json_agg(DISTINCT "category"."name") AS tag,
        json_agg(DISTINCT jsonb_build_object (
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
        WHERE `;
        const placeholders = [limit, offset];
        arr.forEach((filter, index) => {
            const prop = Object.keys(filter)[0];
            queryStart += `${prop} IN (`;
            filter[prop].forEach((filt, indx) => {
                if (indx !== filter[prop].length - 1) {
                    queryStart += `$${placeholders.length + 1}, `;
                } else {
                    queryStart += `$${placeholders.length + 1})`;
                }
                placeholders.push(filt);
            });
            if (index !== arr.length - 1) {
                queryStart += ` AND `;
            }
        });
        const queryEnd = ` GROUP BY r.name, r.description, r.valorisation, r.id, cat.name
        LIMIT $1 OFFSET $2 `;

        queryStart += queryEnd;

        const results = await sqlHandler(queryStart, placeholders);
        return results.rows;
    },
};
