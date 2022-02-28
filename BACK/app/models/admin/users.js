const client = require('../../config/db');
const { ApiError } = require('../../helpers/apiControllerHandler');

/**
 * @typedef {object} users
 * @property {number} userId - Unique identifier
 * @property {string} email - User email
 * @property {string} phone - User phone number
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} adress_number - User adress number
 * @property {string} adress_street - User adress street
 * @property {number} adress_zipcode - User zipcode
 * @property {string} adress_city - User city
 * @property {string} password - User password
 * @property {boolean} cotisation_status - cotisation status
 * @property {date} cotisation_status - cotisation expiration date
 * @property {boolean} caution_status - caution status
 * @property {date} caution_status - caution expiration
 * @property {string} role_name - role name
 * @property {date} creation_date - date creation
 */

module.exports = {
    //Return all users in db
    async findAll() {
        const result = await client.query('SELECT * FROM user');
        return result.rows;
    }
}
