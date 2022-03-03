const client = require('../../config/db');

module.exports = {
    async findAll() {
        const result = await client.query(`
        
        `);
        return result.rows;
    },
};
