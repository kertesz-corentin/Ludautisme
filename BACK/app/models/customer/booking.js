/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} paramAddBookingByRef
 * @property {array<number>} refIds - Array of refs
 */

module.exports = {
    async findActive(id) {
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
		"perm"."active" AS current_permanency,
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
                'number', borrowed."number",
                'available', borrowed."available",
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
		GROUP BY b.id, "user"."id",
                "date_permanency","return_date_permanency","return_id_permanency","active_permanency"
        )
        SELECT *
        FROM booking_full
        WHERE `;
        const placeholders = [];
        try {
            arr.forEach((filter, index) => {
                let prop = Object.keys(filter)[0];
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
    async findHistory(id) {
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
        (perm."perm_date" > CURRENT_DATE) AS is_next_permanency,
        (perm."next_date" > CURRENT_DATE) AND (b.delivered = true ) AND (b.closed = false) AS overdue,
	    json_agg(json_build_object (
                'id', ar."id",
                'number', ar."id",
                'available', ar."available",
                'archived', ar."archived",
				'id_ref', "reference"."id",
				'name_ref', "reference"."name",
				'description_ref', "reference"."description",
				'id_picture_ref', "image"."id",
				'url_picture_ref', "image"."url",
				'text_picture_ref',"image"."alternative_text"
                )) AS "articles"
        FROM "booking" AS b
        INNER JOIN "user" ON "user"."id"="b"."id_user"
		INNER JOIN "article_to_booking" AS ar_to_book ON "b"."id" = "ar_to_book"."id_booking"
        INNER JOIN "article" AS ar ON "ar_to_book"."id_article" = "ar"."id"
		INNER JOIN "full_perm" AS perm ON "perm"."id" = "b"."id_permanency"
        INNER JOIN "reference" ON "reference"."id" = ar."id_ref"
		LEFT JOIN "reference_to_image" AS rti ON "reference"."id" = rti."id_ref"
        LEFT JOIN "image" ON rti."id_image" = "image"."id"
		WHERE "image"."main" = TRUE AND "user"."id"=$1
        GROUP BY b.id, "user"."id",
                "date_permanency","return_date_permanency","return_id_permanency","active_permanency"`;
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
        return result.rows;
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
            ROW_NUMBER() OVER(PARTITION BY ("reference"."id")) AS row_number
            FROM "reference"
            INNER JOIN "article" ON "reference"."id" = "article"."id_ref"
            WHERE ("article"."available"='true' AND "article"."archived"='false') AND"reference"."id" IN (`;
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
            "article_archived",
			row_number
        FROM add_row_number
        WHERE (row_number=1)
        `;
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
};
