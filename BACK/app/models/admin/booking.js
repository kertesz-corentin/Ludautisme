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
 * @typedef {object} Confirm
 * @property {number} article - Number of concerned article
 * @property {number} reservation - Id of conderned reservation
 * @property {string} message - Description of confirmed action
 */
/**
 * @typedef {object} BookingParam
 * @property {number} articleNumber - Number of concerned article
 * @property {number} bookingId - Id of conderned booking
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
 * @property {array<number>} artIds - Array of articles Id
 */
/**
 * @typedef {object} BookingArticles
 * @property {number} id - Unique identifier
 * @property {number} number - Physique code of object
 * @property {string} origin - Origin of object
 * @property {string} date_buy - Date of the object is buy
 * @property {boolean} available - If the object is available for booking
 * @property {boolean} archived - If the object is archived
 * @property {string} created_at - Date of the registration in DB
 * @property {number} id_article - Foreign key to article
 * @property {number} id_booking - Foreign key to booking
 * @property {boolean} delivered - If the booking is delivered
 * @property {boolean} closed - If the articles is return
 * @property {number} nb_prolongation - Number of prolongation in this booking
 * @property {number} id_permanency - Id of the parent permanency
 * @property {number} id_user - Id of the booking owner
 * @property {string} name.required - The name of the reference
 * @property {string} description - The description of the reference
 * @property {number} valorisation - The price of the reference
 * @property {number} main_category - Id of the main category of the reference
 */
module.exports = {
    async findAll() {
        const query = `
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
        	(perm."next_date" < CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
            json_agg(json_build_object (
                'id', borrowed."id",
                'number', borrowed."number",
                'available', borrowed."available",
                'returned', borrowed_ar_to_book."returned",
                'archived', borrowed."archived",
				'id_ref', "reference"."id",
				'name_ref', "reference"."name",
				'description_ref', "reference"."description"
                )) AS "borrowed_articles"
        FROM "booking" AS b
	    INNER JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        INNER JOIN "user" ON "user"."id"="b"."id_user"
        LEFT JOIN "article_to_booking" AS borrowed_ar_to_book ON "b"."id" = "borrowed_ar_to_book"."id_booking"
        LEFT JOIN "article" AS borrowed ON "borrowed_ar_to_book"."id_article" = "borrowed"."id"
        INNER JOIN "reference" ON "reference"."id"="borrowed"."id_ref"
		GROUP BY b.id, "user"."id", b.delivered, b.closed, b.id_permanency
                ,"user"."id"
                ,"user"."member_number"
                ,"user"."first_name"
                ,"user"."last_name"
                ,"user"."email"
                ,"perm"."perm_date"
                ,"perm"."next_id"
                ,"perm"."next_date"
                ,"perm"."active"
        )
        SELECT *
        FROM booking_full`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async findTwoYearsLater() {
        const query = `
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
        	(perm."next_date" < CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
            json_agg(json_build_object (
                'id', borrowed."id",
                'number', borrowed."number",
                'available', borrowed."available",
                'returned', borrowed_ar_to_book."returned",
                'archived', borrowed."archived",
				'id_ref', "reference"."id",
				'name_ref', "reference"."name",
				'description_ref', "reference"."description"
                )) AS "borrowed_articles"
        FROM "booking" AS b
	    INNER JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        INNER JOIN "user" ON "user"."id"="b"."id_user"
        LEFT JOIN "article_to_booking" AS borrowed_ar_to_book ON "b"."id" = "borrowed_ar_to_book"."id_booking"
        LEFT JOIN "article" AS borrowed ON "borrowed_ar_to_book"."id_article" = "borrowed"."id"
        INNER JOIN "reference" ON "reference"."id"="borrowed"."id_ref"
        WHERE "perm"."perm_date" BETWEEN NOW()-INTERVAL '2 YEARS' AND NOW ()
		GROUP BY b.id, "user"."id", b.delivered, b.closed, b.id_permanency
                ,"user"."id"
                ,"user"."member_number"
                ,"user"."first_name"
                ,"user"."last_name"
                ,"user"."email"
                ,"perm"."perm_date"
                ,"perm"."next_id"
                ,"perm"."next_date"
                ,"perm"."active"
        )
        SELECT *
        FROM booking_full`;
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
        	(perm."next_date" < CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
            json_agg(json_build_object (
                'id', borrowed."id",
                'number', borrowed."number",
                'available', borrowed."available",
                'returned', borrowed_ar_to_book."returned",
                'archived', borrowed."archived",
				'id_ref', "reference"."id",
				'name_ref', "reference"."name",
				'description_ref', "reference"."description"
                )) AS "borrowed_articles"
        FROM "booking" AS b
	    INNER JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        INNER JOIN "user" ON "user"."id"="b"."id_user"
        LEFT JOIN "article_to_booking" AS borrowed_ar_to_book ON "b"."id" = "borrowed_ar_to_book"."id_booking"
        LEFT JOIN "article" AS borrowed ON "borrowed_ar_to_book"."id_article" = "borrowed"."id"
        INNER JOIN "reference" ON "reference"."id"="borrowed"."id_ref"
		GROUP BY b.id, "user"."id", b.delivered, b.closed, b.id_permanency
                ,"user"."id"
                ,"user"."member_number"
                ,"user"."first_name"
                ,"user"."last_name"
                ,"user"."email"
                ,"perm"."perm_date"
                ,"perm"."next_id"
                ,"perm"."next_date"
                ,"perm"."active"
        )
        SELECT *
        FROM booking_full
        WHERE `;
        const placeholders = [];
        arr.forEach((filter, index) => {
            const prop = Object.keys(filter)[0];
            placeholders.push(filter[prop]);
            if (index !== arr.length - 1) {
                query += `"${prop}"=$${index + 1} AND `;
            } else {
                query += `"${prop}"=$${index + 1} `;
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async findOne(id) {
        const query = `
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
        	(perm."next_date" < CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
            json_agg(json_build_object (
                'id', borrowed."id",
                'number', borrowed."number",
                'available', borrowed."available",
                'returned', borrowed_ar_to_book."returned",
                'archived', borrowed."archived",
				'id_ref', "reference"."id",
				'name_ref', "reference"."name",
				'description_ref', "reference"."description"
                )) AS "borrowed_articles"
        FROM "booking" AS b
	    INNER JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        INNER JOIN "user" ON "user"."id"="b"."id_user"
        LEFT JOIN "article_to_booking" AS borrowed_ar_to_book ON "b"."id" = "borrowed_ar_to_book"."id_booking"
        LEFT JOIN "article" AS borrowed ON "borrowed_ar_to_book"."id_article" = "borrowed"."id"
        INNER JOIN "reference" ON "reference"."id"="borrowed"."id_ref"
		GROUP BY b.id, "user"."id", b.delivered, b.closed, b.id_permanency
                ,"user"."id"
                ,"user"."member_number"
                ,"user"."first_name"
                ,"user"."last_name"
                ,"user"."email"
                ,"perm"."perm_date"
                ,"perm"."next_id"
                ,"perm"."next_date"
                ,"perm"."active"
        )
        SELECT *
        FROM booking_full
        WHERE  "id"=$1`;
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
    async getRefsAvailability(arr) {
        let query = `
        WITH add_row_number AS (
            SELECT 
            "reference"."id",
            "reference"."name",
            "article"."id" AS "article_id" ,
            "article"."available" AS "article_available",
            "article"."archived" AS "article_archived",
            ROW_NUMBER() OVER(PARTITION BY "reference"."id") AS row_number
            FROM "reference"
            INNER JOIN "article" ON "reference"."id" = "article"."id_ref"
            WHERE "reference"."id" IN (`;
        const placeholders = [];
        arr.forEach((articleId, index) => {
            query += `$${index + 1}`;
            query += (index < arr.length - 1) ? `,` : `)`;
            placeholders.push(articleId);
        });
        query += `
        )
        SELECT
            "id",
            "name",
            "article_id" ,
            "article_available",
            "article_archived"
        FROM add_row_number
        WHERE ("article_available"='true' AND "article_archived"='false' AND row_number=1)
            OR ("article_available"='false' AND row_number=1)
        `;
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
    async deleteArticle(id) {
        const result = await sqlHandler(`
        DELETE FROM "article_to_booking"
        WHERE "id_article" = $1
        RETURNING *`, [id]);
        return result.rows;
    },
    async deleteAllArticles(idBooking) {
        const result = await sqlHandler(`
        DELETE FROM "article_to_booking"
        WHERE "id_booking" = $1
        RETURNING *`, [idBooking]);
        return result.rows;
    },
    async deleteBooking(id) {
        const result = await sqlHandler(`
        DELETE FROM "booking"
        WHERE "id" = $1
        RETURNING *`, [id]);
        return result.rows;
    },
    async return(arr) {
        let queryStart = `UPDATE "article_to_booking"
                            SET "returned"='true'`;

        const placeholders = [];
        if (arr.length > 0) {
            queryStart += ` WHERE "id_article" IN (`;
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
    async close(id) {
        const result = await sqlHandler(`
        UPDATE "booking"
        SET "closed"='true',
            "delivered"='true'
        WHERE "id"=$1
        RETURNING *
        `, [id]);
        return result.rows;
    },
    async deliver(id) {
        const result = await sqlHandler(`
        UPDATE "booking"
        SET "delivered"='true'
        WHERE "id"=$1
        RETURNING *
        `, [id]);
        return result.rows;
    },
};
