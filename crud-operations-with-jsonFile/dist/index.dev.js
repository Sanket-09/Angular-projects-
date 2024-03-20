"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var fs = require('fs'); // create our express app


var app = express(); // middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // route

var routes = require('./route/route');

app.use('/', routes); //start server

app.listen(3000, function () {
  console.log('listeniing at port:3000');
});