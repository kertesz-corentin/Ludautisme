const http = require('http');
require('dotenv').config();
const cron = require('node-cron');
const app = require('./app');
const usersController = require('./app/controllers/admin/users');

const port = process.env.PORT ?? 3000;

const server = http.createServer(app);

// tache cron une fois par semaine
const task = cron.schedule('* 2 * * 7', () => {
    usersController.updateUserData();
}, {
    scheduled: true,
    timezone: 'Europe/Paris',
});
task.start();

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});
