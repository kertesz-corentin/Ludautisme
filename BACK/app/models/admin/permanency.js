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
 * @property {string} perm_date - permanency date
 * @property {number} next_id - permanency date
 * @property {string} next_date - permanency date
 */

module.exports = {
    async findAll() {
        const query =
            `SELECT * ,
            LEAD(id,1) OVER(ORDER BY id) AS next_id,
            LEAD(perm_date,1) OVER(ORDER BY perm_date) AS next_date
            FROM "permanency"`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async findActive() {
        const query = `
            SELECT * FROM(
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
        await sqlHandler(query, placeholders);
        return { status: "Active Perm Changed " };
    },
    async newPerm() {
        const query = `INSERT INTO "permanency" DEFAULT VALUES`;
        await sqlHandler(query);
        return { status: "New Perm Added" };
    },
    async setDateNext(nextId, date) {
        const query = `UPDATE "permanency" SET "perm_date"=$1  WHERE id=$2 RETURNING *`;
        const placeholders = [date, nextId];
        const result = sqlHandler(query, placeholders);
        return result.rows;
    },
};
