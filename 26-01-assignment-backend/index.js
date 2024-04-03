const express = require('express')
const { Pool } = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'backendDatabase',
  password: 'hhs0039i',
  port: 5432,
})

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Define your API endpoints here

app.listen(3000, () => console.log('Server running on port 3000'))
