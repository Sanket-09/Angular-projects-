const { Sequelize } = require('sequelize')

module.exports = new Sequelize('codegig', 'postgres', 'hhs0039i', {
  host: 'localhost',
  dialect: 'postgres',
})
