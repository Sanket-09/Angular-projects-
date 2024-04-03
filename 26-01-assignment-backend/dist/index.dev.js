"use strict";

var express = require('express');

var _require = require('pg'),
    Pool = _require.Pool;

var bodyParser = require('body-parser');

var cors = require('cors');

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'backendDatabase',
  password: 'hhs0039i',
  port: 5432
});
var app = express();
app.use(cors());
app.use(bodyParser.json()); // Define your API endpoints here

app.listen(3000, function () {
  return console.log('Server running on port 3000');
});