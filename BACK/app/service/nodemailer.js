const nodemailer = require('nodemailer');
const controllerHandler = require('../helpers/apiControllerHandler');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: process.env.MAIL_USER,
        // pass: process.env.MAIL_PASSWORD,
        user: 'arnaud.peybernes@gmail.com',
        pass: 'lqtovmfokqjpnqgk',
    },
});

const mailOptions = {
    from: 'vindication@enron.com',
    to: 'reoizhriho@tete.zob',
    subject: 'Invoices due',
    text: 'Dudes, we really need your money.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
