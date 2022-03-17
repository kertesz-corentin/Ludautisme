const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} Category
 * @property {number} id - Unique identifier
 * @property {string} name - Name of category
 * @property {string} description - Description of category
 * @property {boolean} main - If category is main or secondary
 */

module.exports = {
    async findAll() {
        const result = await sqlHandler('SELECT * FROM "category"');
        return result.rows;
    },
    async findFiltered(arr) {
        let query = `SELECT * FROM "category"
        WHERE `;
        const placeholders = [];
        arr.forEach((filter, index) => {
            const prop = Object.keys(filter)[0];
            placeholders.push(filter[prop]);
            if (index !== arr.length - 1) {
                query += `${prop}=$${index + 1} AND `;
            } else {
                query += `${prop}=$${index + 1}`;
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
};
