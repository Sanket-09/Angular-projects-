"use strict";

var express = require('express');

var fs = require('fs');

var moviesController = require('../controllers/moviesController.js');

var router = express.Router(); //returns a middleware

router.route('/').get(moviesController.getAllMovies).post(moviesController.createMovie);
router.route('/:id').get(moviesController.getMovieById).patch(moviesController.patchMovie)["delete"](moviesController.deleteMovie);
module.exports = router;