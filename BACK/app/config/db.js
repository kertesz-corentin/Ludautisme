const { Pool } = require('pg');

const config = {};
// Heroku
if (process.env.NODE_ENV !== 'dev') {
    config.connectionString = 'postgres://vxto8575_apey:@pey@pey12@127.0.0.1:5432/vxto8575_ludautisme';
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
