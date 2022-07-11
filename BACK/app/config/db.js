const { Pool } = require('pg');

const config = {};
// Heroku
if (process.env.NODE_ENV !== 'dev') {
    config.connectionString = process.env.DATABASE_URL;
    // config.ssl = {
    //     rejectUnauthorized: false,
    // };
} else {
    config.connectionString = process.env.DATABASE_DEV;
}

const pool = new Pool(config);

module.exports = {
    originalClient: pool,
    async query(...params) {
        console.error(...params);
        return this.originalClient.query(...params);
    },
};
