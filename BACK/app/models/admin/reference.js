const client = require('../../config/db');

module.exports = {
    async findAll() {
        const result = await client.query(`
        SELECT
        r.id,
        r.name,
        r.description,
        r.valorisation,
        cat.name AS mainCategory,
        json_agg("category"."name") AS tag
        FROM "reference" AS r
        LEFT JOIN "category" AS cat ON r."id_category" = cat."id"
        LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        LEFT JOIN "category" ON rtc."id_category" = "category"."id"
        GROUP BY r.name, r.description, r.valorisation, r.id, cat.name
        `);
        return result.rows;
    },
    async findActive() {
        const result = await client.query(`
        SELECT
        r.id,
        r.name,
        r.description,
        r.valorisation,
        cat.name AS mainCategory,
        json_agg("category"."name") AS tag
        FROM "reference" AS r
        LEFT JOIN "category" AS cat ON r."id_category" = cat."id"
        LEFT JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        LEFT JOIN "category" ON rtc."id_category" = "category"."id"
        LEFT JOIN "article" ON "article"."id_ref" = r."id"
        WHERE "article"."available" = true
        GROUP BY r.name, r.description, r.valorisation, r.id, cat.name
        `);
        return result.rows;
    },
};
