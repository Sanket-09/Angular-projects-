"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var app = express();
var port = 8000;

var db = require('./query.js');

var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function (request, response) {
  response.json({
    info: 'Node.js, Express, and Postgres API'
  });
});
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app["delete"]('/users/:id', db.deleteUser);
app.listen(port, function () {
  console.log("App running on port ".concat(port, "."));
});