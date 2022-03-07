/* eslint-disable no-tabs */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
const client = require('../../config/db');
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
        (perm."next_date" > CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
	    json_agg(json_build_object (
                'id', ar."id",
                'ref_number', ar."ref_number",
                'available', ar."available",
                'archived', ar."archived"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
		INNER JOIN "article_to_booking" AS ar_to_book ON "b"."id" = "ar_to_book"."id_booking"
        INNER JOIN "article" AS ar ON "ar_to_book"."refnum_article" = "ar"."ref_number"
		LEFT JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        GROUP BY b.id, "user"."id","date_permanency","return_date_permanency","return_id_permanency";`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async findFiltered(arr) {
        let query = `
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
        "perm"."next_id" AS return_id_permanency,
        "perm"."next_date" AS return_date_permanency,
        (perm."next_date" > CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
	    json_agg(json_build_object (
                'id', ar."id",
                'ref_number', ar."ref_number",
                'available', ar."available",
                'archived', ar."archived"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
		INNER JOIN "article_to_booking" AS ar_to_book ON "b"."id" = "ar_to_book"."id_booking"
        INNER JOIN "article" AS ar ON "ar_to_book"."refnum_article" = "ar"."ref_number"
		LEFT JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        WHERE `;
        const placeholders = [];
        const aliases = {
            b: ['id', 'delivered', 'closed', 'id_permanency'],
            user: ['id_user', 'first_name', 'last_name', 'email', 'member_number'],
            articles: ['id', 'ref_number', 'available', 'archived'],
            perm: ['date_permanency'],
        };
        try {
            arr.forEach((filter, index) => {
                const prop = Object.keys(filter)[0];
                const propAliases = Object.keys(aliases);
                const alias = propAliases.find((Alias) => aliases[Alias].includes(prop));
                console.log(alias);
                placeholders.push(filter[prop]);
                if (index !== arr.length - 1) {
                    query += `"${alias}"."${prop}"=$${index + 1} AND `;
                } else {
                    query += `"${alias}"."${prop}"=$${index + 1} `;
                }
            });
            query += `GROUP BY b.id, "user"."id","date_permanency","return_date_permanency","return_id_permanency"`;
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
        (perm."next_date" > CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
	    json_agg(json_build_object (
                'id', ar."id",
                'ref_number', ar."ref_number",
                'available', ar."available",
                'archived', ar."archived"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
		INNER JOIN "article_to_booking" AS ar_to_book ON "b"."id" = "ar_to_book"."id_booking"
        INNER JOIN "article" AS ar ON "ar_to_book"."refnum_article" = "ar"."ref_number"
		LEFT JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        WHERE b.id=$1
        GROUP BY b.id, "user"."id","date_permanency","return_date_permanency","return_id_permanency"`;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async addOne(id,articles) {
        const query = 'SELECT * FROM "booking" WHERE id=$1';
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
};
