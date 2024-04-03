const express = require('express')
const consola = require('consola')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoutes.js')

const {
  requireAuth,
  checkCurrentUser,
} = require('./middleware/authMiddleware.js')

const app = express()
app.use(express.json()) //parses into javascript object so that we can access it
app.use(cookieParser())

// middleware
app.use(express.static('public')) //this is written to use the static files and png etc

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI =
  'mongodb+srv://sanket:sanketjaiswal@jwtcluster.f2xurav.mongodb.net/node-auth'
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    (result) => app.listen(3000),
    console.log('server started at port 3000')
  )
  .catch((err) => console.log(err))

// routes
app.get('*', checkCurrentUser)
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoute)

// //set cookies
// app.get('/set-cookies', (req, res) => {
//   res.cookie('newUser', false, { maxAge: 10000 * 60 * 60 * 24 })
//   res.send('You got the cookies')
// })

// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies
//   console.log(cookies)
//   res.json(cookies)
// })
