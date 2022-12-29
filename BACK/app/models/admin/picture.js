/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} Pictures
 * @property {array<Picture>} picture - Url of picture
 */
/**
 * @typedef {object} Picture
 * @property {number} id - Unique identifier
 * @property {string} url - Url of reference image
 * @property {string} name - Title of picture
 * @property {string} text - Alternative text of picture
 * @property {boolean} main - If is the main picture of article
 */
/**
 * @typedef {object} ParamsCreatePicture
 * @property {string} picture.required - The file picture - application/multipart form(file)
 * @property {string} title - Title of the picture
 * @property {string} description - Alternative text of the picture
 * @property {number} refId.required - Foreign key of the parent reference
 * @property {boolean} main - If the picture is the main
 */
/**
 * @typedef {object} ParamsUpdatePicture
 * @property {string} title - Title of the picture
 * @property {string} description - Alternative text of picture
 * @property {boolean} main - If the image is the main
 */
module.exports = {
    async addPicture(obj) {
        const props = Object.keys(obj);
        let query = `INSERT INTO "image" (`;
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
        return result.rows;
    },
    async addRelation(refId, pictId) {
        const result = await sqlHandler(
            `INSERT INTO "reference_to_image" ("id_ref", "id_image") VALUES
        ($1, $2)`,
            [refId, pictId],
        );
        return result.rows;
    },
    async passSecondary(refId, id) {
        const result = await sqlHandler(
            `UPDATE "image" AS img
            SET "main" = false
            FROM "image"
            JOIN "reference_to_image" AS rti ON rti."id_image" = "image"."id"
            WHERE rti."id_ref" = $1
            AND img."id" != $2`,
            [refId, id],
        );
        return result.rows;
    },
    async deletePicture(id) {
        const result = await sqlHandler('DELETE FROM "image" WHERE id=$1', [id]);

        return !!result.rowCount;
    },
    async getById(id) {
        const result = await sqlHandler(`SELECT * FROM "image"
                                        LEFT JOIN "reference_to_image" AS rti
                                        ON rti."id_image" = "image"."id"
                                        WHERE "image"."id" = $1`, [id]);
        return result.rows;
    },
    async getForOneRef(id) {
        const result = await sqlHandler(`SELECT * FROM image 
                                        LEFT JOIN "reference_to_image" AS rti 
                                        ON "id_image" = "image"."id" 
                                        WHERE "rti"."id_ref" = $1`, [id]);
        return result.rows;
    },
    async update(id, obj) {
        const props = Object.keys(obj);
        let query = `UPDATE "image" SET `;
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
};
