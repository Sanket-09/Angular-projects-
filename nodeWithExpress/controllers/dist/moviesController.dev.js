"use strict";

var express = require('express');

var fs = require('fs');

var movies = JSON.parse(fs.readFileSync('data/movies.json')); //route handler functions

exports.getAllMovies = function (req, res) {
  //the callback function is known as route handler
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies //formatted the data using json jsend formatting

    }
  });
};

exports.getMovieById = function (req, res) {
  var currentId = req.params.id * 1; //multiplying the id with 1 to change it to number from string
  //to make a parameter optional , add a question mark

  var currentMovie = movies.find(function (obj) {
    return obj.id === currentId;
  });
  if (!currentMovie) return res.status(404).json({
    status: 'Not found',
    data: {
      movie: 'Movie with ID ' + currentId + ' not found'
    }
  });
  res.status(200).json({
    status: 'Sucess',
    data: {
      movie: currentMovie
    }
  });
};

exports.createMovie = function (req, res) {
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
};

exports.patchMovie = function (req, res) {
  var currId = req.params.id * 1;
  var currMovieToUpdate = movies.find(function (el) {
    return el.id === currId;
  });

  if (!currMovieToUpdate) {
    return res.status(404).json({
      status: 'Not found',
      message: 'Movie with ID ' + currId + ' not found'
    });
  }

  var index = movies.indexOf(currMovieToUpdate); //this will return the index of the current movie

  var updatedMovieObject = Object.assign(currMovieToUpdate, req.body);
  movies[index] = currMovieToUpdate;
  fs.writeFile('/data/movies.json', JSON.stringify(movies), function (err, val) {
    res.status(200).json({
      status: 'Success',
      data: {
        movie: currMovieToUpdate
      }
    });
  });
};

exports.deleteMovie = function (req, res) {
  var idDelete = req.params.id * 1;
  var movieToDelete = movies.find(function (el) {
    return el.id === idDelete;
  });

  if (!movieToDelete) {
    return res.status(404).json({
      status: 'Failed',
      data: {
        message: 'Movie with ID ' + idDelete + ' not found'
      }
    });
  }

  var indexDelete = movies.indexOf(movieToDelete);
  movies.splice(indexDelete, 1); //mutates the original array

  fs.writeFile('./data/movies.json', JSON.stringify(movies), function (err, val) {
    res.status(204).json({
      status: 'Success',
      data: {
        movie: null
      }
    });
  });
};