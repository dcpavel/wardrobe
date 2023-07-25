const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { appendFile } = require('fs');
const { PORT } = require('./envVars');

const app = express();

// automatically parse json and cookies
app.use(express.json());
app.use(cookieParser());



app.listen(
  PORT,
  () => { console.log(`Listening on port ${PORT}...`) }
);

module.exports = app;