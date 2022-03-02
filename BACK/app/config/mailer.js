const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: process.env.MAIL_USER,
        // pass: process.env.MAIL_PASSWORD,
        user: 'arnaud.peybernes@gmail.com',
        pass: 'lqtovmfokqjpnqgk',
    },
});

module.exports = {
    send(to,subject,text) {
        const mailOptions = {
            from: 'vindication@enron.com',
            to,
            subject,
            text,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
};
