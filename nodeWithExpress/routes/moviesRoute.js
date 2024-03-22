const express = require('express')
const fs = require('fs')
const moviesController = require('../controllers/moviesController.js')

const router = express.Router() //returns a middleware

router
  .route('/')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie)

router
  .route('/:id')
  .get(moviesController.getMovieById)
  .patch(moviesController.patchMovie)
  .delete(moviesController.deleteMovie)

module.exports = router
