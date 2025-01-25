const sqlHandler = require('../../helpers/sqlHandler');

module.exports = {
    async getUser() {
        const query = `
        SELECT
        user_status.name,
        COUNT("user".id)
        FROM "user"
        JOIN "user_status" ON "user".id_status = "user_status".id
        WHERE cotisation_status = true
        GROUP BY user_status.name`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async getBooking() {
        const query = ``;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async getGames() {
        const query = ``;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async getCategory() {
        const query = ``;
        const result = await sqlHandler(query);
        return result.rows;
    },
};
