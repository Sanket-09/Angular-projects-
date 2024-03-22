const express = require('express') //returns a function
const fs = require('fs')
const morgan = require('morgan')

const app = express() //stores the object

const logger = (req, res, next) => {
  console.log('Custom middleware called')
  next() //need to call next else request will be stuck
}

app.use(express.json())
app.use(morgan('dev')) //this has parenthesis because this function will return a function which will then be used
app.use(logger)
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString()
  next()
})
//route handler functions
const getAllMovies = (req, res) => {
  //the callback function is known as route handler
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies, //formatted the data using json jsend formatting
    },
  })
}

const getMovieById = (req, res) => {
  const currentId = req.params.id * 1 //multiplying the id with 1 to change it to number from string
  //to make a parameter optional , add a question mark

  const currentMovie = movies.find((obj) => {
    return obj.id === currentId
  })

  if (!currentMovie)
    return res.status(404).json({
      status: 'Not found',
      data: {
        movie: 'Movie with ID ' + currentId + ' not found',
      },
    })

  res.status(200).json({
    status: 'Sucess',
    data: {
      movie: currentMovie,
    },
  })
}

const createMovie = (req, res) => {
  const newId = movies[movies.length - 1].id + 1
  const newMovie = Object.assign({ id: newId }, req.body) //object.assign combines two objects
  movies.push(newMovie)

  fs.writeFile('./data/movies.json', JSON.stringify(movies), (err, val) => {
    res.status(201).json({
      status: ' Success ',
      data: {
        movie: newMovie,
      },
    })
  })
}

const patchMovie = (req, res) => {
  const currId = req.params.id * 1
  const currMovieToUpdate = movies.find((el) => el.id === currId)

  if (!currMovieToUpdate) {
    return res.status(404).json({
      status: 'Not found',
      message: 'Movie with ID ' + currId + ' not found',
    })
  }

  let index = movies.indexOf(currMovieToUpdate) //this will return the index of the current movie

  const updatedMovieObject = Object.assign(currMovieToUpdate, req.body)
  movies[index] = currMovieToUpdate

  fs.writeFile('/data/movies.json', JSON.stringify(movies), (err, val) => {
    res.status(200).json({
      status: 'Success',
      data: {
        movie: currMovieToUpdate,
      },
    })
  })
}

const deleteMovie = (req, res) => {
  const idDelete = req.params.id * 1
  const movieToDelete = movies.find((el) => {
    return el.id === idDelete
  })

  if (!movieToDelete) {
    return res.status(404).json({
      status: 'Failed',
      data: {
        message: 'Movie with ID ' + idDelete + ' not found',
      },
    })
  }

  const indexDelete = movies.indexOf(movieToDelete)

  movies.splice(indexDelete, 1) //mutates the original array

  fs.writeFile('./data/movies.json', JSON.stringify(movies), (err, val) => {
    res.status(204).json({
      status: 'Success',
      data: {
        movie: null,
      },
    })
  })
}

let movies = JSON.parse(fs.readFileSync('data/movies.json'))

// app.get('/api/v1/movies', getAllMovies)

// app.post('/api/v1/movies', createMovie)

// //Get single movie
// //API HAVING ROUTE PARAMETER
// app.get('/api/v1/movies/:id', getMovieById)

// //PATCH REQUEST
// app.patch('/api/v1/movies/:id', patchMovie)

// //DELETE REQUEST
// app.delete('/api/v1/movies/:id', deleteMovie)

const moviesRouter = express.Router() //returns a middleware

moviesRouter.route('/').get(getAllMovies).post(createMovie)

moviesRouter
  .route('/:id')
  .get(getMovieById)
  .patch(patchMovie)
  .delete(deleteMovie)

app.use('/api/v1/movies', moviesRouter) //mounting middleware to path

const port = 3000

app.listen(port, () => {
  console.log('server has started')
})
