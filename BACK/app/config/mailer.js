const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false,
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

module.exports = {
    send(to, subject, html) {
        const mailOptions = {
            from: 'carniguide@hotmail.fr',
            to,
            subject,
            html,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return 'error';
            }
            return 'success';
        });
    },
};
