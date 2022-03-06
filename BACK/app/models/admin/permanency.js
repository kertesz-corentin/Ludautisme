/* eslint-disable no-tabs */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
const client = require('../../config/db');
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} permanency
 * @property {number} id - Unique identifier
 * @property {boolean} active - Is it the current active permanency?
 * @property {boolean} published - Date is published?
 * @property {string} date - permanency date
 */

module.exports = {
    async findAll() {
        const result = await client.query(
            `SELECT * ,
            LEAD(id,1) OVER(ORDER BY id) AS next_id,
            LEAD(perm_date,1) OVER(ORDER BY perm_date) AS next_date
            FROM "permanency"`,
        );
        return result.rows;
    },
    async findActive() {
        const query = `SELECT * FROM(
                SELECT "id","perm_date","active","published",
                    LEAD(id,1) OVER(ORDER BY id) AS next_id,
                    LEAD(perm_date,1) OVER(ORDER BY id) AS next_date
                FROM "permanency") x
            WHERE true IN (active);`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async toggleActive(id) {
        const query = `UPDATE "permanency" SET "active" = NOT "active" WHERE id=$1 OR id =$2;`;
        const placeholders = [id, id + 1];
        try {
            await client.query(query, placeholders);
            return { status: "Active Perm Changed " };
        } catch (err) {
            console.error(err);
        }
    },
    async newPerm() {
        await client.query(`INSERT INTO "permanency" DEFAULT VALUES`);
        return { status: "New Perm Added" };
    },
    async setDateNext() {
        const result = await client.query(`SELECT * FROM "permanency"`);
        return result.rows;
    },
};
