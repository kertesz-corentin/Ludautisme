/* eslint-disable no-tabs */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const client = require('../../config/db');
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} Article
 * @property {number} id - Unique identifier
 * @property {number} number - Physique code of object
 * @property {string} origin - Origin of object
 * @property {string} date_buy - Date of the object is buy
 * @property {boolean} available - If the object is available for booking
 * @property {boolean} archived - If the object is archived
 * @property {string} created_at - Date of the registration in DB
 * @property {number} id_ref - ID of the parent reference
 * @property {string} ref_name - Name of the parent reference
 * @property {string} cat_id - category ID of the parent reference
 * @property {string} cat_name - category Name of the parent reference
 */
/**
 * @typedef {object} Articles
 * @property {array<Article>} article - One article of the reference
 */
/**
 * @typedef {object} ParamArticleCreate
 * @property {number} number - Physique code of object
 * @property {string} origin - The origin of the object
 * @property {string} date_buy - Date of purchase of object
 * @property {number} id_ref - ID of the parent reference
 * @property {boolean} available - if article is available for borrow
 * @property {boolean} archived - if article is archived
 */
module.exports = {
    async findAll() {
        const query = `
        SELECT
        "article"."id",
		"article"."number",
		"reference"."name" AS "name_ref",
		"reference"."main_category" AS "main_cat_ref",
		"article"."origin",
		"article"."date_buy",
		"article"."available",
		"article"."archived",
		"article"."id_ref"
        FROM "article"
        INNER JOIN "reference" ON "article"."id_ref"="reference"."id"`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async findOne(id) {
        const query = `
        SELECT
        "article"."id",
		"article"."number",
		"reference"."name" AS "name_ref",
		"reference"."main_category" AS "main_cat_ref",
		"article"."origin",
		"article"."date_buy",
		"article"."available",
		"article"."archived",
		"article"."id_ref"
        FROM "article"
        INNER JOIN "reference" ON "article"."id_ref"="reference"."id"
            WHERE "article"."id" = $1
            `;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async findByCode(code) {
        try {
            const result = await client.query(`
            SELECT * FROM "article"
            WHERE "number" =$1
            `, [code]);
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    },
    async create(obj) {
        try {
            const props = Object.keys(obj);
            let query = `INSERT INTO "article" (`;
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
            const result = await client.query(query, placeholders);
            return result.rows[0];
        } catch (err) {
            console.error(err);
        }
    },
    async findFiltered(arr) {
        let query = `
        SELECT
        "article"."id",
		"article"."number",
		"reference"."name" AS "name_ref",
		"reference"."main_category" AS "main_cat_ref",
		"article"."origin",
		"article"."date_buy",
		"article"."available",
		"article"."archived",
		"reference"."id" AS "id_ref"
        FROM "article"
        INNER JOIN "reference" ON "article"."id_ref"="reference"."id"
        WHERE `;
        const placeholders = [];
        arr.forEach((filter, index) => {
            let prop = Object.keys(filter)[0];
            placeholders.push(filter[prop]);
            prop = (prop !== "id") ? prop : `"article"."id"`;
            if (index !== arr.length - 1) {
                query += `${prop}=$${index + 1} AND `;
            } else {
                query += `${prop}=$${index + 1}`;
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async update(id, obj) {
        const props = Object.keys(obj);
        let query = `UPDATE "article" SET `;
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
    async getArticleAvaibility(number) {
        const result = await sqlHandler(`
        SELECT
        art.id,
        art.number,
        art.available,
        art.archived,
        atb.returned
        FROM "article" AS art
        LEFT JOIN "article_to_booking" AS atb ON atb."id_article" = art."id"
        WHERE art.id = $1
        `, [number]);
        return result.rows[0];
    },
    async return(arr) {
        let queryStart = `UPDATE "article"
                            SET "available"='true'
                            WHERE "id" IN (`;

        const placeholders = [];
        if (arr.length > 0) {
            arr.forEach((id, indx) => {
                if (indx !== arr.length - 1) {
                    queryStart += `$${placeholders.length + 1}, `;
                } else {
                    queryStart += `$${placeholders.length + 1})`;
                }
                placeholders.push(id);
            });
        }
        const queryEnd = ` RETURNING *`;
        queryStart += queryEnd;
        const result = await sqlHandler(queryStart, placeholders);
        return result.rows;
    },
    async getStatus(articleId) {
        const result = await sqlHandler(`
        SELECT
        "user"."first_name",
        "user"."last_name",
        "user"."member_number"
        FROM "article_to_booking"
        INNER JOIN "booking" ON "article_to_booking"."id_article" = "booking"."id"
        INNER JOIN "user" ON "user"."id" = "booking"."id_user"
        WHERE id_article = $1 AND returned = false
        `, [articleId]);
        return result.rows[0];
    },
};
