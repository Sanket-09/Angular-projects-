const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CRUD',
  password: 'hhs0039i',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM cards ORDER BY id ASC', (error, results) => {
    if (error) {
      response.status(500).json({ error: error.message })
      return
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM cards WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).json({ error: error.message })
      return
    }
    if (results.rows.length == 0)
      response.status(404).json({
        message: `id : ${id} not found in the database`,
      })

    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { image, addedBy, createdDate, markettingRights } = request.body

  pool.query(
    'INSERT INTO cards (name, email) VALUES ($1, $2 , $3 , $4) RETURNING *',
    [image, addedBy, createdDate, markettingRights],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: error.message })
        return
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
  )
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE cards SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        response.status(500).json({ error: error.message })
        return
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  console.log(request)
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM cards WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).json({ error: error.message })
      return
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
