const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: "Lud'autisme",
    streams: [
        {
            level: 'error',
            path: './log/error.log',
            type: 'rotating-file',
            period: '1d',
            count: 90, // History of 90 days (3 months)
        },
    ],
});

module.exports = logger;
