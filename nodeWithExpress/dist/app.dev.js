"use strict";

var express = require('express'); //returns a function


var fs = require('fs');

var morgan = require('morgan');

var moviesRouter = require('./routes/moviesRoute.js');

var app = express(); //stores the object

var logger = function logger(req, res, next) {
  console.log('Custom middleware called');
  next(); //need to call next else request will be stuck
};

app.use(express.json());
app.use(morgan('dev')); //this has parenthesis because this function will return a function which will then be used

app.use(logger);
app.use(function (req, res, next) {
  req.requestedAt = new Date().toISOString();
  next();
});
var movies = JSON.parse(fs.readFileSync('data/movies.json')); // app.get('/api/v1/movies', getAllMovies)
// app.post('/api/v1/movies', createMovie)
// //Get single movie
// //API HAVING ROUTE PARAMETER
// app.get('/api/v1/movies/:id', getMovieById)
// //PATCH REQUEST
// app.patch('/api/v1/movies/:id', patchMovie)
// //DELETE REQUEST
// app.delete('/api/v1/movies/:id', deleteMovie)

app.use('/api/v1/movies', moviesRouter); //mounting middleware to path

module.exports = app;