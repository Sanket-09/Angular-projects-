const express = require('express')
const router = express.Router()
const db = require('../config/database.js')
const gigModel = require('../models/Gigs.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//get gig list
router.get('/', (req, res) =>
  gigModel
    .findAll()
    .then((gigs) => {
      console.log(gigs)
      const plainGigs = gigs.map((gig) => gig.get({ plain: true }))
      res.render('gigs', { gigs: plainGigs })
    })
    .catch((err) => console.log(err))
)

//display add gig form
router.get('/add', (req, res) => res.render('add'))

//add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body
  let errors = []

  if (!title) {
    errors.push({ text: 'Please add a title' })
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies' })
  }
  if (!description) {
    errors.push({ text: 'Please add a description' })
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' })
  }

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    })
  } else {
    if (!budget) {
      budget = 'Unknown'
    } else {
      budget = `$${budget}`
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',')

    // Insert into table
    gigModel
      .create({
        title,
        technologies,
        description,
        budget,
        contact_email,
      })
      .then((gig) => res.redirect('/gigs'))
      .catch((err) => res.render('error', { error: err.message }))
  }
})

router.get('/search', (req, res) => {
  let { term } = req.query

  // Make lowercase
  term = term.toLowerCase()

  gigModel
    .findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then((gigs) => {
      const plainGigs = gigs.map((gig) => gig.get({ plain: true }))
      res.render('gigs', { gigs: plainGigs })
    })
    .catch((err) => res.render('error', { error: err }))
})

module.exports = router
