/* eslint-disable max-len */
const client = require('../config/db');

/**
 * Controller wrapper to manage errors
 * @param {string} query a simple of parametred query
 * @param {array} placeholders an array of placeholders
 * @returns {object} result or error
 */
module.exports = async (query, placeholders) => {
    try {
        const result = (!placeholders) ? await client.query(query) : await client.query(query, placeholders);
        return result;
    } catch (err) {
        const showErr = {
            name: err.constructor.name,
            message: err.message,
            stack: err.stack,
            table: err.table,
            schemas: err.schemas,
            column: err.column,
            dataType: err.dataType,
        };
        console.error(showErr);
        return { rows: [showErr] };
    }
};
