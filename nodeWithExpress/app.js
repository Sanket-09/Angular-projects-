const express = require('express') //returns a function
const fs = require('fs')

const app = express() //stores the object
app.use(express.json())

let movies = JSON.parse(fs.readFileSync('data/movies.json'))

app.get('/api/v1/movies', (req, res) => {
  //the callback function is known as route handler
  res.status(200).json({
    status: 'success',
    count: movies.length,
    data: {
      movies: movies, //formatted the data using json jsend formatting
    },
  })
})

app.post('/api/v1/movies', (req, res) => {
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
})

const port = 3000

app.listen(port, () => {
  console.log('server has started')
})
