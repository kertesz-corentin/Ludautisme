/* eslint-disable no-tabs */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
const client = require('../../config/db');
const { findFiltered } = require('./users');

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
	    b.delivered,
	    b.closed,
	    b.id_permanency,
	    "user"."id" AS id_user,
	    "user"."first_name",
	    "user"."last_name",
        "user"."email",
		"perm"."perm_date" AS date_permanency,
	    json_agg(json_build_object (
                'id', ar."id",
                'ref_number', ar."ref_number",
                'available', ar."available",
                'archived', ar."archived"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
        INNER JOIN "article" AS ar ON "b"."id" = "ar"."id_booking"
		INNER JOIN "permanency" AS perm ON "perm"."id" = "b"."id_permanency"
        GROUP BY b.id, "user"."id","date_permanency";`);
        return result.rows;
    },
    async findFiltered(arr) {
        console.log(arr);
        let query = `
        SELECT
	    b.id,
	    b.delivered,
	    b.closed,
	    b.id_permanency,
	    "user"."id" AS id_user,
	    "user"."first_name",
	    "user"."last_name",
        "user"."email",
		"perm"."perm_date" AS date_permanency,
	    json_agg(json_build_object (
                'id', ar."id",
                'ref_number', ar."ref_number",
                'available', ar."available",
                'archived', ar."archived"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
        INNER JOIN "article" AS ar ON "b"."id" = "ar"."id_booking"
		INNER JOIN "permanency" AS perm ON "perm"."id" = "b"."id_permanency"
        WHERE `;
        const placeholders = [];
        const aliases = {
            b: ['id', 'delivered', 'closed', 'id_permanency'],
            user: ['id_user', 'first_name', 'last_name', 'email'],
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
            query += `GROUP BY b.id, "user"."id","date_permanency"`;
        } catch (err) {
            console.error(err);
        }
        const result = await client.query(query, placeholders);
        return result.rows;
    },
};
