"use strict";

var Pool = require('pg').Pool;

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CRUD',
  password: 'hhs0039i',
  port: 5432
});

var getUsers = function getUsers(request, response) {
  pool.query('SELECT * FROM cards ORDER BY id ASC', function (error, results) {
    if (error) {
      response.status(500).json({
        error: error.message
      });
      return;
    }

    response.status(200).json(results.rows);
  });
};

var getUserById = function getUserById(request, response) {
  var id = parseInt(request.params.id);
  pool.query('SELECT * FROM cards WHERE id = $1', [id], function (error, results) {
    if (error) {
      response.status(500).json({
        error: error.message
      });
      return;
    }

    if (results.rows.length == 0) response.status(404).json({
      message: "id : ".concat(id, " not found in the database")
    });
    response.status(200).json(results.rows);
  });
};

var createUser = function createUser(request, response) {
  var _request$body = request.body,
      image = _request$body.image,
      addedBy = _request$body.addedBy,
      createdDate = _request$body.createdDate,
      markettingRights = _request$body.markettingRights;
  pool.query('INSERT INTO cards (name, email) VALUES ($1, $2 , $3 , $4) RETURNING *', [image, addedBy, createdDate, markettingRights], function (error, results) {
    if (error) {
      response.status(500).json({
        error: error.message
      });
      return;
    }

    response.status(201).send("User added with ID: ".concat(results.rows[0].id));
  });
};

var updateUser = function updateUser(request, response) {
  var id = parseInt(request.params.id);
  var _request$body2 = request.body,
      name = _request$body2.name,
      email = _request$body2.email;
  pool.query('UPDATE cards SET name = $1, email = $2 WHERE id = $3', [name, email, id], function (error, results) {
    if (error) {
      response.status(500).json({
        error: error.message
      });
      return;
    }

    response.status(200).send("User modified with ID: ".concat(id));
  });
};

var deleteUser = function deleteUser(request, response) {
  console.log(request);
  var id = parseInt(request.params.id);
  pool.query('DELETE FROM cards WHERE id = $1', [id], function (error, results) {
    if (error) {
      response.status(500).json({
        error: error.message
      });
      return;
    }

    response.status(200).send("User deleted with ID: ".concat(id));
  });
};

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};