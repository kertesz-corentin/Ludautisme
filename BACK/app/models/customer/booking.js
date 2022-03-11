/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} paramsBooking
 * @property {number} refIds - Array of refs
 */

module.exports = {
    async findActive(id) {
        console.log(id);
        const query = `
        SELECT
	    b.id,
	    b.delivered,
	    b.closed,
	    b.id_permanency,
	    "user"."id" AS id_user,
        "user"."member_number" AS member_number,
	    "user"."first_name",
	    "user"."last_name",
        "user"."email",
		"perm"."perm_date" AS date_permanency,
        "perm"."next_id" AS return_id_permanency,
        "perm"."next_date" AS return_date_permanency,
		"perm"."active" AS active_permanency,
        (perm."next_date" > CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
	    json_agg(json_build_object (
                'id', ar."id",
                'number', ar."id",
                'available', ar."available",
                'archived', ar."archived"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
		LEFT JOIN "article_to_booking" AS ar_to_book ON "b"."id" = "ar_to_book"."id_booking"
        LEFT JOIN "article" AS ar ON "ar_to_book"."id_article" = "ar"."id"
		LEFT JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        WHERE "user"."id"=$1 AND "perm"."active"=true
        GROUP BY b.id, "user"."id",
                "date_permanency","return_date_permanency","return_id_permanency","active_permanency";`;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async findHistory(id) {
        console.log(id);
        const query = `
        SELECT
	    b.id,
	    b.delivered,
	    b.closed,
	    b.id_permanency,
	    "user"."id" AS id_user,
        "user"."member_number" AS member_number,
	    "user"."first_name",
	    "user"."last_name",
        "user"."email",
		"perm"."perm_date" AS date_permanency,
        "perm"."next_id" AS return_id_permanency,
        "perm"."next_date" AS return_date_permanency,
		"perm"."active" AS active_permanency,
        (perm."next_date" > CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
	    json_agg(json_build_object (
                'id', ar."id",
                'number', ar."id",
                'available', ar."available",
                'archived', ar."archived"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
		LEFT JOIN "article_to_booking" AS ar_to_book ON "b"."id" = "ar_to_book"."id_booking"
        LEFT JOIN "article" AS ar ON "ar_to_book"."id_article" = "ar"."id"
		LEFT JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        WHERE "user"."id"=$1 AND "perm"."active"=false AND CURRENT_DATE > "perm"."perm_date"
        GROUP BY b.id, "user"."id",
                "date_permanency","return_date_permanency","return_id_permanency","active_permanency";`;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async addOne(obj) {
        const props = Object.keys(obj);
        let query = `INSERT INTO "booking" (`;
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
    },
    async addArticlesToBooking(id, arr) {
        let query = `INSERT INTO "article_to_booking" ("id_booking","id_article") VALUES `;
        const placeholders = [];
        arr.forEach((articleId, index) => {
            query += `(${id},$${index + 1})`;
            query += (index < arr.length - 1) ? `,` : ` RETURNING *;`;
            placeholders.push(articleId);
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async updateArticlesAvailability(arr) {
        let query = `UPDATE "article" SET "available"='false' WHERE `;
        const placeholders = [];
        arr.forEach((articleId, index) => {
            query += `"id"=$${index + 1}`;
            query += (index < arr.length - 1) ? ` OR ` : ` RETURNING *;`;
            placeholders.push(articleId);
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async getArticlesAvailability(arr) {
        let query = `
       SELECT * FROM "article" WHERE "article"."id" IN (`;
        const placeholders = [];
        arr.forEach((articleId, index) => {
            query += `$${index + 1}`;
            query += (index < arr.length - 1) ? `,` : `);`;
            placeholders.push(articleId);
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
};
