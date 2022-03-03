/* eslint-disable no-tabs */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
const client = require('../../config/db');

/**
 * @typedef {object} booking
 * @property {number} id - Unique identifier
 * @property {string} member_id - member unique id
 * @property {string} member_number - member card number
 * @property {string} email - member email
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} date_start - Booking created at
 * @property {string} max_return_date - Booking expire at
 * @property {boolean} delivered - User got games
 * @property {boolean} close - User had given back games
 * @property {number} permamency_id - Permanency number for the booking
 * @property {boolean} overdue - overdue returning game
 */

module.exports = {
    async findAll() {
        const result = await client.query(`
        SELECT
	    b.id,
	    b.date_start,
	    b.max_return_date,
	    b.delivered,
	    b.closed,
	    b.id_permanency,
	    "user"."id",
	    "user"."first_name",
	    "user"."last_name",
        "user"."email",
	    json_agg(json_build_object (
                'id', ar."id",
                'ref_number', ar."ref_number",
                'available', ar."available",
                'archived', ar."archived"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
        INNER JOIN "article" AS ar ON "b"."id" = "ar"."id_booking"
        GROUP BY b.id, "user"."id"`);
        return result.rows;
    },
};
