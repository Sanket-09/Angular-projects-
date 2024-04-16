"use strict";

var sequelize = require('sequelize');

var db = require('../config/database.js');

var Gig = db.define('gig', {
  title: {
    type: sequelize.STRING
  },
  technologies: {
    type: sequelize.STRING
  },
  description: {
    type: sequelize.STRING
  },
  budget: {
    type: sequelize.STRING
  },
  contact_email: {
    type: sequelize.STRING
  }
});
module.exports = Gig;