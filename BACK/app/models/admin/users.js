const client = require('../../config/db');
const { ApiError } = require('../../helpers/apiControllerHandler');

/**
 * @typedef {object} users
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
 * @property {string} password - User password
 * @property {boolean} cotisation_status - cotisation status
 * @property {string} cotisation_expiration - cotisation expiration date
 * @property {boolean} caution_status - caution status
 * @property {string} caution_expiration - caution expiration
 * @property {number} id_role - role name
 * @property {string} created_at - date creation
 */

module.exports = {
    //  Return all users in db
    async findAll() {
        const result = await client.query('SELECT * FROM "user"');
        return result.rows;
    },
};
