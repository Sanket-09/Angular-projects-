"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var db = require('../config/database.js');

var gigModel = require('../models/Gigs.js');

var Sequelize = require('sequelize');

var Op = Sequelize.Op; //get gig list

router.get('/', function (req, res) {
  return gigModel.findAll().then(function (gigs) {
    console.log(gigs);
    var plainGigs = gigs.map(function (gig) {
      return gig.get({
        plain: true
      });
    });
    res.render('gigs', {
      gigs: plainGigs
    });
  })["catch"](function (err) {
    return console.log(err);
  });
}); //display add gig form

router.get('/add', function (req, res) {
  return res.render('add');
}); //add a gig

router.post('/add', function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      technologies = _req$body.technologies,
      budget = _req$body.budget,
      description = _req$body.description,
      contact_email = _req$body.contact_email;
  var errors = [];

  if (!title) {
    errors.push({
      text: 'Please add a title'
    });
  }

  if (!technologies) {
    errors.push({
      text: 'Please add some technologies'
    });
  }

  if (!description) {
    errors.push({
      text: 'Please add a description'
    });
  }

  if (!contact_email) {
    errors.push({
      text: 'Please add a contact email'
    });
  }

  if (errors.length > 0) {
    res.render('add', {
      errors: errors,
      title: title,
      technologies: technologies,
      budget: budget,
      description: description,
      contact_email: contact_email
    });
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = "$".concat(budget);
    } // Make lowercase and remove space after comma


    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ','); // Insert into table

    gigModel.create({
      title: title,
      technologies: technologies,
      description: description,
      budget: budget,
      contact_email: contact_email
    }).then(function (gig) {
      return res.redirect('/gigs');
    })["catch"](function (err) {
      return res.render('error', {
        error: err.message
      });
    });
  }
});
router.get('/search', function (req, res) {
  var term = req.query.term; // Make lowercase

  term = term.toLowerCase();
  gigModel.findAll({
    where: {
      technologies: _defineProperty({}, Op.like, '%' + term + '%')
    }
  }).then(function (gigs) {
    var plainGigs = gigs.map(function (gig) {
      return gig.get({
        plain: true
      });
    });
    res.render('gigs', {
      gigs: plainGigs
    });
  })["catch"](function (err) {
    return res.render('error', {
      error: err
    });
  });
});
module.exports = router;