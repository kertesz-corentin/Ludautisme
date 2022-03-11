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
};
