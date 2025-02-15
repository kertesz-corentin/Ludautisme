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
        const query = `
        SELECT
        to_char(permanency.perm_date, 'TMMonth'),
        COUNT (booking.id)
        FROM permanency
        JOIN booking ON permanency.id = booking.id_permanency
        WHERE permanency.perm_date >= current_date - interval '1' year and
        permanency.perm_date < current_date
        GROUP BY perm_date
        ORDER BY EXTRACT('Month' FROM perm_date) ASC;
        `;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async getGames() {
        const query = `
        SELECT 
        reference.name,
        COUNT(art.id)
        FROM "article"
        JOIN article_to_booking AS art ON "article".id = art.id_article
        JOIN reference ON article.id_ref = reference.id
        JOIN booking ON art.id_booking = booking.id
        JOIN permanency ON booking.id_permanency = permanency.id
        WHERE permanency.perm_date >= current_date - interval '1' year and
        permanency.perm_date < current_date
        GROUP BY reference.name
        ORDER BY COUNT(art.id) DESC;`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async getCategory() {
        const query = `
        SELECT 
        category.name,
        COUNT(category.id)
        FROM "article"
        JOIN article_to_booking AS art ON "article".id = art.id_article
        JOIN reference ON article.id_ref = reference.id
        JOIN category ON category.id = reference.main_category
        JOIN booking ON art.id_booking = booking.id
        JOIN permanency ON booking.id_permanency = permanency.id
        WHERE permanency.perm_date >= current_date - interval '1' year and
        permanency.perm_date < current_date
        GROUP BY category.name
        ORDER BY COUNT(art.id) DESC;`;
        const result = await sqlHandler(query);
        return result.rows;
    },
};
