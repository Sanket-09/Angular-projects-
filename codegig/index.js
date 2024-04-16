const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./config/database.js')

db.authenticate()
  .then(() => {
    return console.log('Database Connection established successfully')
  })
  .catch((e) => console.log('Error :' + e))

const app = express()

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: false }))

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  return res.render('INDEX', { layout: 'landing' })
})

app.use('/gigs', require('./routes/routeGigs.js'))

app.listen(PORT, console.log(`Server started on port ${PORT}`))
