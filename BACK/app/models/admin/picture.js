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
};
