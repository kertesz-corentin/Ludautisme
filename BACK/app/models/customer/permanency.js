const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} Category
 * @property {number} id - Unique identifier
 * @property {string} name - Name of category
 * @property {string} description - Description of category
 * @property {boolean} main - If category is main or secondary
 */

module.exports = {
    async findActive() {
        const query = ` SELECT * FROM(
            SELECT "id","perm_date","active","published",
                LEAD(id,1) OVER(ORDER BY id) AS next_id,
                LEAD(perm_date,1) OVER(ORDER BY id) AS next_date
            FROM "permanency") x
        WHERE true IN (active);`;
        const result = await sqlHandler(query);
        return result.rows;
    },
};
