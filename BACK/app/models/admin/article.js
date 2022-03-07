/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const client = require('../../config/db');

/**
 * @typedef {object} Article
 * @property {number} id - Unique identifier
 * @property {number} ref_number - Physique code of object
 * @property {string} origin - Origin of object
 * @property {string} date_buy - Date of the object is buy
 * @property {boolean} available - If the object is available for booking
 * @property {boolean} archived - If the object is archived
 * @property {string} created_at - Date of the registration in DB
 * @property {number} id_ref - ID of the parent reference
 */
/**
 * @typedef {object} Articles
 * @property {array<Article>} article - One article of the reference
 */
/**
 * @typedef {object} ParamArticleCreate
 * @property {number} ref_number - Physique code of object
 * @property {string} origin - The origin of the object
 * @property {string} date_buy - Date of purchase of object
 * @property {number} id_ref - ID of the parent reference
 */
module.exports = {
    async findByCode(code) {
        try {
            const result = await client.query(`
            SELECT * FROM "article"
            WHERE "ref_number" =$1
            `, [code]);
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    },
    async create(obj) {
        try {
            const props = Object.keys(obj);
            let query = `INSERT INTO "article" (`;
            let columns = ``;
            let values = ``;
            const placeholders = [];
            props.forEach((prop, index) => {
                if (index !== props.length - 1) {
                    columns += `${prop}, `;
                    values += `$${index + 1}, `;
                } else {
                    columns += `${prop}) VALUES (`;
                    values += `$${index + 1}) RETURNING *`;
                }
                placeholders.push(obj[prop]);
            });
            query += columns + values;
            const result = await client.query(query, placeholders);
            return result.rows[0];
        } catch (err) {
            console.error(err);
        }
    },
};
