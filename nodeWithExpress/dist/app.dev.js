"use strict";

var express = require('express'); //returns a function


var fs = require('fs');

var app = express(); //stores the object

app.use(express.json());
var movies = JSON.parse(fs.readFileSync('data/movies.json'));
app.get('/api/v1/movies', function (req, res) {
  //the callback function is known as route handler
  res.status(200).json({
    status: 'success',
    count: movies.length,
    data: {
      movies: movies //formatted the data using json jsend formatting

    }
  });
});
app.post('/api/v1/movies', function (req, res) {
  var newId = movies[movies.length - 1].id + 1;
  var newMovie = Object.assign({
    id: newId
  }, req.body); //object.assign combines two objects

  movies.push(newMovie);
  fs.writeFile('./data/movies.json', JSON.stringify(movies), function (err, val) {
    res.status(201).json({
      status: ' Success ',
      data: {
        movie: newMovie
      }
    });
  });
});
var port = 3000;
app.listen(port, function () {
  console.log('server has started');
});