"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

var db = require('./app/model');

var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
db.sequelize.sync(); // db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.')
// })

app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to fullstack application Sanket.'
  });
});

require('./app/routes/tutorial.routes')(app);

var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT, "."));
});