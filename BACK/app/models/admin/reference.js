/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
const sqlHandler = require('../../helpers/sqlHandler');
/**
 * @typedef {object} paramRefCreate
 * @property {string} name.required - The name of the reference
 * @property {string} description - The description of the reference
 * @property {number} valorisation - The price of the reference
 * @property {number} main_category - Id of the main category of the reference
 */
/**
 * @typedef {object} RefUpdate
 * @property {number} id - Unique identifier
 * @property {string} name - Name of the reference
 * @property {string} description - Description of the reference
 * @property {number} valorisation - Price of the reference
 * @property {number} main_category - Id if the main category
 */
module.exports = {
    async findAll() {
        const result = await sqlHandler(`
        SELECT
        r.id,
        r.name,
        r.description,
        r.valorisation,
        cat.id AS id_maincat,
        cat.name AS name_maincat,
        json_agg(DISTINCT jsonb_build_object(
            'id',"category"."id",
            'name',"category"."name"
            )) AS tag
        FROM "reference" AS r
        LEFT JOIN "category" AS cat ON r."main_category" = cat."id"
        LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        LEFT JOIN "category" ON rtc."id_category" = "category"."id"
        LEFT JOIN "article" ON "article"."id_ref" = r."id"
        GROUP BY r.name, r.description, r.valorisation, r.id, cat.name,cat.id
        `);
        return result.rows;
    },
    async findActive() {
        const result = await sqlHandler(`
        SELECT
        r.id,
        r.name,
        r.description,
        r.valorisation,
        cat.name AS mainCategory,
         json_agg(DISTINCT jsonb_build_object(
                    'id',"category"."id",
                    'name',"category"."name"
                    )) AS tag
        FROM "reference" AS r
        LEFT JOIN "category" AS cat ON r."main_category" = cat."id"
        LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        LEFT JOIN "category" ON rtc."id_category" = "category"."id"
        LEFT JOIN "article" ON "article"."id_ref" = r."id"
        WHERE "article"."available" = true AND "article"."archived" = false
        GROUP BY r.name, r.description, r.valorisation, r.id, cat.name
        `);
        return result.rows;
    },
    async findOne(id) {
        try {
            const result = await sqlHandler(
                `SELECT
            r.id,
            r.name,
            r.description,
            r.valorisation,
            cat.id AS id_maincat,
            cat.name AS name_maincat,
            json_agg(DISTINCT jsonb_build_object(
                'id',"category"."id",
                'name',"category"."name"
                )) AS tag,
            json_agg(DISTINCT jsonb_build_object (
                'id', "image"."id",
                'url', "image"."url",
                'title', "image"."title",
                'text', "image"."alternative_text",
                'main', "image"."main"
                )) AS "picture",
            json_agg(DISTINCT jsonb_build_object (
                'id', ar."id",
                'number', ar."number",
                'origin', ar."origin",
                'date_buy', ar."date_buy",
                'available', ar."available",
                'archived', ar."archived",
                'created_at', ar."created_at"
                )) AS "articles"
            FROM "reference" AS r
            LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
            LEFT JOIN "image" ON rti."id_image" = "image"."id"
            LEFT JOIN "category" AS cat ON r."main_category" = cat."id"
            LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
            LEFT JOIN "category" ON rtc."id_category" = "category"."id"
            LEFT JOIN "article" AS ar ON ar."id_ref" = r."id"
            WHERE r.id = $1
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name, cat.id`,
                [id],
            );
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    },
    async findFiltered(arr) {
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
        const placeholders = [];

        let queryEnd = null;
        // eslint-disable-next-line no-unused-expressions
        if (arr.length > 0) {
            queryStart += ` WHERE `;
            arr.forEach((filter, index) => {
                const prop = Object.keys(filter)[0];
                console.log(prop);
                console.log(filter[prop]);
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
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name, fav.id_user`;
        } else {
            queryEnd = `
            GROUP BY r.name, r.description, r.valorisation, r.id, cat.name, fav.id_user`;
        }

        queryStart += queryEnd;

        const results = await sqlHandler(queryStart, placeholders);
        return results.rows;
    },
    async findManyWithRefId(arr) {
        try {
            let query = `
            SELECT
            r.id,
            r.name,
            r.description,
            r.valorisation,
            cat.id AS id_maincat,
            cat.name AS name_maincat,
            json_agg(DISTINCT jsonb_build_object(
                'id',"category"."id",
                'name',"category"."name"
                )) AS tag,
            json_agg(DISTINCT jsonb_build_object (
                'id', "image"."id",
                'url', "image"."url",
                'title', "image"."title",
                'text', "image"."alternative_text",
                'main', "image"."main"
                )) AS "picture",
            json_agg(DISTINCT jsonb_build_object (
                'id', ar."id",
                'number', ar."number",
                'origin', ar."origin",
                'date_buy', ar."date_buy",
                'available', ar."available",
                'archived', ar."archived",
                'created_at', ar."created_at"
                )) AS "articles"
            FROM "reference" AS r
            LEFT JOIN "reference_to_image" AS rti ON r."id" = rti."id_ref"
            LEFT JOIN "image" ON rti."id_image" = "image"."id"
            LEFT JOIN "category" AS cat ON r."main_category" = cat."id"
            LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
            LEFT JOIN "category" ON rtc."id_category" = "category"."id"
            LEFT JOIN "article" AS ar ON ar."id_ref" = r."id"
            WHERE r.id IN (`;
            const placeholders = [];
            arr.forEach((articleId, index) => {
                query += `$${index + 1}`;
                query += (index < arr.length - 1) ? `,` : `)`;
                placeholders.push(articleId);
            });

            query += ` GROUP BY r.name, r.description, r.valorisation, r.id, cat.name, cat.id`;
            const result = await sqlHandler(query, placeholders);
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    },
    async create(obj) {
        try {
            const props = Object.keys(obj);
            let query = `INSERT INTO "reference" (`;
            let columns = ``;
            let values = ``;
            const placeholders = [];
            props.forEach((prop, index) => {
                if (index !== props.length - 1) {
                    columns += `${prop}, `;
                    values += `$${index + 1}, `;
                } else {
                    columns += `${prop}) VALUES (`;
                    values += `$${index + 1}) RETURNING *`;
                }
                placeholders.push(obj[prop]);
            });
            query += columns + values;
            const result = await sqlHandler(query, placeholders);
            return result.rows[0];
        } catch (err) {
            console.error(err);
        }
    },
    async findByName(name) {
        try {
            const result = await sqlHandler(`
            SELECT * FROM "reference"
            WHERE "name" =$1
            `, [name]);
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    },
    async  update(id, obj) {
        const props = Object.keys(obj);

        let query = `UPDATE "reference" SET `;
        const placeholders = [];
        props.forEach((prop, index) => {
            placeholders.push(obj[prop]);
            if (index !== props.length - 1) {
                query += `${prop}=$${index + 1}, `;
            } else {
                query += `${prop}=$${index + 1} WHERE id=$${index + 2} RETURNING *`;
                placeholders.push(id);
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
};
