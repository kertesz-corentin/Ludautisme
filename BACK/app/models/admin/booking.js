/* eslint-disable quotes */
/* eslint-disable consistent-return */
const client = require('../../config/db');

/**
 * @typedef {object} booking
 * @property {number} id - Unique identifier
 * @property {string} member_id - member unique id
 * @property {string} member_number - member card number
 * @property {string} email - member email
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} date_start - Booking created at
 * @property {string} max_return_date - Booking expire at
 * @property {boolean} delivered - User got games
 * @property {boolean} close - User had given back games
 * @property {number} permamency_id - Permanency number for the booking
 * @property {boolean} overdue - overdue returning game
 */

module.exports = {
    async findAll() {
        const result = await client.query('SELECT * FORM booking');
        return result.rows;
    },
};
