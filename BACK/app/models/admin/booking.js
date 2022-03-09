/* eslint-disable no-tabs */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} booking
 * @property {number} id - Unique identifier
 * @property {boolean} delivered - User got games
 * @property {boolean} closed - User had given back games
 * @property {string} id_user - member unique id
 * @property {string} member_number - member card number
 * @property {string} email - member email
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {number} id_permanency - Permanency number for the booking
 * @property {string} date_permanency - Permanency's booking
 * @property {boolean} overdue - overdue returning game
 */

/**
 * @typedef {object} paramSearchBooking
 * @property {number} id - Unique identifier
 * @property {boolean} delivered - User got games
 * @property {boolean} closed - User had given back games
 * @property {string} id_user - member unique id
 * @property {string} member_number - member card number
 * @property {string} email - member email
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {number} id_permanency - Permanency number for the booking
 * @property {string} date_permanency - Borrow data
 * @property {string} return_permanency - Return expected Date
 * @property {boolean} overdue - overdue returning game
 */

/**
 * @typedef {object} paramAddBooking
 * @property {number} request.param.id.required - Array of articles Id
 * @property {number} request.body.articleId.required - Array of articles Id
 */

module.exports = {
    async findAll() {
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
        GROUP BY b.id, "user"."id",
            "date_permanency","return_date_permanency","return_id_permanency","active_permanency";`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async findFiltered(arr) {
        let query = `
        WITH booking_full AS(
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
                'id', borrowed."id",
                'number', borrowed."id",
                'available', borrowed."available",
                'archived', borrowed."archived"
                )) AS "borrowed_articles"
        FROM "booking" AS b
	    INNER JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        INNER JOIN "user" ON "user"."id"="b"."id_user"
        LEFT JOIN "article_to_booking" AS borrowed_ar_to_book ON "b"."id" = "borrowed_ar_to_book"."id_booking"
        LEFT JOIN "article" AS borrowed ON "borrowed_ar_to_book"."id_article" = "borrowed"."id"
		GROUP BY b.id, "user"."id",
                "date_permanency","return_date_permanency","return_id_permanency","active_permanency"
        )
        SELECT *
        FROM booking_full
        WHERE `;
        const placeholders = [];
        console.log(arr);
        try {
            arr.forEach((filter, index) => {
                const prop = Object.keys(filter)[0];
                console.log(prop);
                placeholders.push(filter[prop]);
                if (index !== arr.length - 1) {
                    query += `"${prop}"=$${index + 1} AND `;
                } else {
                    query += `"${prop}"=$${index + 1} `;
                }
            });
            const result = await sqlHandler(query, placeholders);
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    },
    async findOne(id) {
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
        WHERE b.id=$1
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
        let query = `SELECT * FROM article WHERE id IN (`;
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
