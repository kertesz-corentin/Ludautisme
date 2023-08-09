/* eslint-disable quotes */
/* eslint-disable consistent-return */
const sqlHandler = require('../../helpers/sqlHandler');
// const { ApiError } = require('../../helpers/apiControllerHandler');

/**
 * @typedef {object} users
 * @property {number} id - Unique identifier
 * @property {number} member_number - Unique identifier
 * @property {string} phone - User phone number
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} email - User email
 * @property {string} adress_number - User adress number
 * @property {string} adress_street - User adress street
 * @property {number} adress_zipcode - User zipcode
 * @property {string} adress_city - User city
 * @property {string} password - User password
 * @property {boolean} archived - User archived status
 * @property {boolean} cotisation_status - cotisation status
 * @property {string} cotisation_expiration - cotisation expiration date
 * @property {boolean} caution_status - caution status
 * @property {string} caution_expiration - caution expiration
 * @property {number} id_role - role id
 * @property {number} id_status - status id
 * @property {string} created_at - date creation
 */

/**
 * @typedef {object} paramUserCreate
 * @property {number} member_number.required - Unique identifier
 * @property {string} phone.required - User phone number
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} email.required - User email
 * @property {string} adress_number.required - User adress number
 * @property {string} adress_street.required - User adress street
 * @property {number} adress_zipcode.required - User zipcode
 * @property {string} adress_city.required - User city
 * @property {string} password - User password
 * @property {boolean} archived - User archived status
 * @property {boolean} cotisation_status - cotisation status
 * @property {string} cotisation_expiration - cotisation expiration date
 * @property {boolean} caution_status - caution status
 * @property {string} caution_expiration - caution expiration
 * @property {number} id_role - role id
 */

/**
 * @typedef {object} paramSearch
 * @property {number} id - Unique identifier
 * @property {number} member_number - Unique identifier
 * @property {string} phone - User phone number
 * @property {string} first_name - User first name
 * @property {string} last_name - User last name
 * @property {string} email - User email
 * @property {boolean} archived - User archived status
 */

const userList = `
        "user"."id",
        "user"."adress_city",
        "user"."adress_number",
        "user"."adress_street",
        "user"."adress_zipcode",
        "user"."archived",
        "user"."caution_expiration",
        "user"."caution_status",
        "user"."cotisation_expiration",
        "user"."cotisation_status",
        "user"."email",
        "user"."first_name",
        "user"."id_role",
        "user"."last_name",
        "user"."member_number",
        "user"."phone",
        "user"."social_reason",
        "user"."id_status",
        "user_status"."name"`;

module.exports = {
    //  Return all users in db
    async findAll() {
        const query = `SELECT ${userList} FROM "user" 
        INNER JOIN "role" ON "role"."id" = "user"."id_role" 
        INNER JOIN "user_status" ON "user_status"."id" = "user"."id_status" `;
        const result = await sqlHandler(query);
        return result.rows;
    },

    async findById(id) {
        const query = `SELECT ${userList} FROM "user" 
        INNER JOIN "role" ON "role"."id" = "user"."id_role" 
        INNER JOIN "user_status" ON "user_status"."id" = "user"."id_status" 
        WHERE "user".id=$1`;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },

    async findFiltered(arr) {
        let query = `SELECT "user".*, role.name FROM "user" 
                    INNER JOIN "role" ON "role"."id" = "user"."id_role" 
                    INNER JOIN "user_status" ON "user_status"."id" = "user"."id_status" 
                    WHERE `;
        const placeholders = [];
        arr.forEach((filter, index) => {
            const prop = Object.keys(filter)[0];
            placeholders.push(filter[prop]);
            if (index !== arr.length - 1) {
                query += `"user".${prop}=$${index + 1} AND `;
            } else {
                query += `"user".${prop}=$${index + 1}`;
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },

    async addUser(obj) {
        const props = Object.keys(obj);
        let query = `INSERT INTO "user" (`;
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
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },

    async update(id, obj) {
        const props = Object.keys(obj);
        let query = `UPDATE "user" SET `;
        const placeholders = [];
        props.forEach((prop, index) => {
            placeholders.push(obj[prop]);
            if (index !== props.length - 1) {
                query += `${prop}=$${index + 1}, `;
            } else {
                query += `${prop}=$${index + 1} WHERE id=$${index + 2} RETURNING *`;
                placeholders.push(id);
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "user" WHERE id=$1 RETURNING *`;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
};
