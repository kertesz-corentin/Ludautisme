const mailer = require('../../config/mailer');
require('dotenv').config();

module.exports = {
    async send(req, res) {
        const {
            name, email, object, message,
        } = req.body;
        const html = `<div>
                        <h1>Nouveau message de contact</h1>
                        <p>Nom: ${name}</p>
                        <p>Email: ${email}</p>
                        <p>Objet: ${object}</p>
                        <p>Message: ${message}</p>
                    </div>`;
        const send = mailer.send(process.env.MAIL_TARGET, `Message ludautisme ${object}`, html);
        if (send === 'error') {
            res.status(500).json("erreur d'envoi");
        } else {
            res.json('success');
        }
    },
};
