const { Pool } = require('pg');

const config = {};

// Heroku
if (process.env.NODE_ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.ssl = {
        rejectUnauthorized: false,
    };
} else {
    config.connectionString = process.env.DATABASE_DEV;
    config.ssl = {
        rejectUnauthorized: false,
    };
}

console.log(config);

const pool = new Pool(config);

module.exports = {
    originalClient: pool,
    async query(...params) {
        console.error(...params);
        return this.originalClient.query(...params);
    },
};
