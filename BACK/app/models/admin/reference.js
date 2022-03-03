const client = require('../../config/db');

module.exports = {
    async findAll() {
        const result = await client.query(`
        r.id,
        r.name,
        r.description,
        r.valorisation,
        cat.name AS mainCategory,
        json_agg("category"."name") AS tag
        FROM "reference" AS r
        JOIN "category" AS cat ON r."id_category" = cat."id"
        JOIN "reference_to_category" AS rtc ON rtc."id_ref" = r."id"
        JOIN "category" ON rtc."id_category" = "category"."id"
        GROUP BY r.name, r.description, r.valorisation, r.id, cat.name, "category"."name"
        `);
        return result.rows;
    },
};
