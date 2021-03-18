require('dotenv').config();
const express = require('express');
const app = express();
const {} = process.env;

require('./database');
require('./middleware')(app);
// ! todo – I think I don't need this as I'll be taking data direct from server – no  crud by user. So call like fetch app (?)
// require('./routes')(app);

module.exports = app;
