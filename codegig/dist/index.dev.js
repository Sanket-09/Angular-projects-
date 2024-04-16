"use strict";

var express = require('express');

var _require = require('express-handlebars'),
    engine = _require.engine;

var bodyParser = require('body-parser');

var path = require('path');

var db = require('./config/database.js');

db.authenticate().then(function () {
  return console.log('Database Connection established successfully');
})["catch"](function (e) {
  return console.log('Error :' + e);
});
var app = express();
app.engine('handlebars', engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: false
})); //set static folder

app.use(express["static"](path.join(__dirname, 'public')));
var PORT = process.env.PORT || 5000;
app.get('/', function (req, res) {
  return res.render('INDEX', {
    layout: 'landing'
  });
});
app.use('/gigs', require('./routes/routeGigs.js'));
app.listen(PORT, console.log("Server started on port ".concat(PORT)));