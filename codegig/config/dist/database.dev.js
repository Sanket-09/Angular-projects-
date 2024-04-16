"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

module.exports = new Sequelize('codegig', 'postgres', 'hhs0039i', {
  host: 'localhost',
  dialect: 'postgres'
});