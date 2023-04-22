/* eslint-disable quotes */
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
 * @property {number} nb_total - Sum of all articles
 * @property {number} nb_available - Sum of availables articles
 *
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
            FROM "reference" AS r
            LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
            LEFT JOIN "image" ON rti."id_image" = "image"."id"
            JOIN "category" AS cat ON r."main_category" = cat."id"
            LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
            LEFT JOIN "category" ON rtc."id_category" = "category"."id"
            LEFT JOIN "article" ON "article"."id_ref" = "r"."id"
            WHERE "article"."archived" = false
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name`,
        );
        return result.rows;
    },
    async findNameList() {
        const result = await sqlHandler(
            `SELECT
            r."id",
            r."name"
            FROM "reference" AS r`
        );
        return result.rows;
    },
    async findOne(id) {
        const result = await sqlHandler(
            `SELECT
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
            FROM "reference" AS r
            LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
            LEFT JOIN "image" ON rti."id_image" = "image"."id"
            JOIN "category" AS cat ON r."main_category" = cat."id"
            LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
            LEFT JOIN "category" ON rtc."id_category" = "category"."id"
            LEFT JOIN "article" ON "article"."id_ref" = "r"."id"
            WHERE r."id" = $1
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name`,
            [id]
        );
        return result.rows;
    },

    async findFiltered(arr, offset, limit, userId) {
        let queryStart = `SELECT
        r.id,
        r.name,
        r."description",
        r.valorisation,
        cat.name AS mainCategory,
        json_agg(DISTINCT jsonb_build_object(
            'id',"category"."id",
            'name',"category"."name"
            )) AS tag,
        COUNT(DISTINCT ar."id") AS nb_total,
        json_agg(DISTINCT jsonb_build_object (
            'id', ar."id",
            'number', ar."number",
            'origin', ar."origin",
            'date_buy', ar."date_buy",
            'available', ar."available",
            'archived', ar."archived",
            'created_at', ar."created_at"
            )) AS "articles_list",
        COUNT(DISTINCT ar."id") FILTER (WHERE ar."available" = TRUE) AS nb_available,
        json_agg(DISTINCT jsonb_build_object (
            'id', "image"."id",
            'url', "image"."url",
            'name', "image"."title",
            'text', "image"."alternative_text",
            'main', "image"."main"
        )) AS "picture"`;
        queryStart += (userId) ? `, (fav."id_user" = $1) AS "favorite"` : '';

        queryStart += `
        FROM "reference" AS r
        LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
        LEFT JOIN "image" ON rti."id_image" = "image"."id"
        LEFT JOIN "category" AS cat ON r."main_category" = cat."id"
        LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        LEFT JOIN "category" ON rtc."id_category" = "category"."id"
        LEFT JOIN "article" AS ar ON ar."id_ref" = r."id"
        LEFT JOIN "favorite_user_to_reference" AS fav ON fav."id_ref" = r."id"
        `;
        const placeholders = [userId[0], limit, offset];

        let queryEnd = null;
        // eslint-disable-next-line no-unused-expressions
        if (arr.length > 0) {
            queryStart += ` WHERE `;
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
            queryEnd = ` 
            AND ar."archived" = false
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name, fav.id_user
            LIMIT $2 OFFSET $3 `;
        } else {
            queryEnd = ` 
            WHERE ar."archived" = false
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name, fav.id_user
            LIMIT $2 OFFSET $3 `;
        }

        queryStart += queryEnd;

        const results = await sqlHandler(queryStart, placeholders);
        return results.rows;
    },
    async findCountResult(arr) {
        let queryStart = `SELECT
        COUNT(DISTINCT r."id") AS nb_total
        FROM "reference" AS r
        LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
        LEFT JOIN "image" ON rti."id_image" = "image"."id"
        LEFT JOIN "category" AS cat ON r."main_category" = cat."id"
        LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        LEFT JOIN "category" ON rtc."id_category" = "category"."id"
        LEFT JOIN "article" AS ar ON ar."id_ref" = r."id"
        LEFT JOIN "favorite_user_to_reference" AS fav ON fav."id_ref" = r."id"
        `;
        const placeholders = [];
        if (arr.length > 0) {
            queryStart += ` WHERE `;
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
        }
        const results = await sqlHandler(queryStart, placeholders);
        return results.rows;
    },
};
