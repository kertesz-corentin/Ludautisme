/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} customerUsers
 * @property {number} id - Unique identifier
 * @property {number} member_number - Unique identifier
 * @property {string} phone - User phone number
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} email - User email
 * @property {string} adress_number - User adress number
 * @property {string} adress_street - User adress street
 * @property {number} adress_zipcode - User zipcode
 * @property {string} adress_city - User city
 */

module.exports = {
    async findById(id) {
        const query = `SELECT
         "user"."id",
         "user"."email",
         "user"."member_number",
         "user"."phone",
         "user"."first_name",
         "user"."last_name",
         "user"."adress_number",
         "user"."adress_street",
         "user"."adress_zipcode",
         "user"."adress_city"
         FROM "user" WHERE id=$1`;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async update(id, obj) {
        const props = Object.keys(obj);
        let query = `UPDATE "user" SET `;
        const placeholders = [];
        props.forEach((prop, index) => {
            placeholders.push(obj[prop]);
            if (index !== props.length - 1) {
                query += `${prop}=$${index + 1}, `;
            } else {
                query += `${prop}=$${index + 1} WHERE id=$${index + 2} RETURNING *`;
                placeholders.push(id);
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
};
