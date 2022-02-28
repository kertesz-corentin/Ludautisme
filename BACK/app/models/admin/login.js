const client = require('../../config/db');

module.exports = {
    //  Return all users in db
    async login() {
        const result = await client.query('');
        return result.rows;
    },
};
