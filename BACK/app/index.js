const express = require('express');
const cors = require('cors');
const router = require('./routes');
const app = express();

//Serve React app
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const buildPath = `${appDir}/../FRONT/build`;
//END Serve React app
require('./helpers/apiDoc')(app);

app.use('/',express.static(buildPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

module.exports = app;
