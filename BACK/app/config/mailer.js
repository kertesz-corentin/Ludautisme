const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

module.exports = {
    send(to, subject, html) {
        const mailOptions = {
            from: 'vindication@enron.com',
            to,
            subject,
            html,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
    },
};
