/**
 * @typedef {object} ApiError
 * @property {string} status - Status
 * @property {number} statusCode - HTTP Status code
 * @property {string} message - Error message
 *
 */

module.exports = class SqlError extends Error {
    constructor(message,stack) {
        super(message);
        this.name = 'Sql request error';
        this.message = message;
        this.stack = stack;
    }
};
