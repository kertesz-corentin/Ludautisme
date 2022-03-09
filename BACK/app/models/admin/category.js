/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} Category
 * @property {number} id - Unique identifier
 * @property {string} name - Name of category
 * @property {string} description - Description of category
 * @property {boolean} main - If category is main or secondary
 */
/**
 * @typedef {object} ParamCreateCat
 * @property {string} name.required - Name of category
 * @property {string} description - Description of category
 * @property {boolean} main - If category is main or secondary
 */
module.exports = {
    async getAll() {
        const result = await sqlHandler('SELECT * FROM "category"');
        return result.rows;
    },
    async findFiltered(arr) {
        let query = `SELECT * FROM "category"
        WHERE `;
        const placeholders = [];
        console.log(`placeholder: ${placeholders}`);
        arr.forEach((filter, index) => {
            const prop = Object.keys(filter)[0];
            placeholders.push(filter[prop]);
            if (index !== arr.length - 1) {
                query += `${prop}=$${index + 1} AND`;
            } else {
                query += `${prop}=$${index + 1}`;
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async create(obj) {
        const props = Object.keys(obj);
        let query = `INSERT INTO "category" (`;
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
};
