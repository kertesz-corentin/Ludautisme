/* eslint-disable consistent-return */
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
 * @property {boolean} archived - User archived status
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

    async findFiltered(obj) {
        const prop = Object.keys(obj)[0];
        const value = obj[prop];
        let column;
        switch (prop) {
        case 'id':
            column = 'id';
            if (Number.isNaN(value)) {
                throw new ApiError(400, 'An id must be a number');
            }
            break;
        case 'member_number':
            column = 'member_number';
            if (Number.isNaN(value)) {
                throw new ApiError(400, 'A member_number must be a number');
            }
            break;
        case 'email':
            column = 'email';
            break;
        case 'first_name':
            column = 'first_name';
            break;
        case 'last_name':
            column = 'last_name';
            break;
        case 'archived':
            column = 'archived';
            if (typeof value !== 'boolean') {
                throw new ApiError(400, 'Archived must be a boolean');
            }
            break;
        default:
            return;
        }
        const result = await client.query(
            `
                SELECT * FROM "user"
                WHERE ${column}=$1
            `,
            [value],
        );
        return result.rows;
    },
};
