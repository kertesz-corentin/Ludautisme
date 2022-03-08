const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} Category
 * @property {number} id - Unique identifier
 * @property {string} name - Name of category
 * @property {string} description - Description of category
 * @property {boolean} main - If category is main ou secondary
 */
module.exports = {
    async getAll() {
        const result = await sqlHandler('SELECT * FROM "category"');
        return result.rows;
    },
};
