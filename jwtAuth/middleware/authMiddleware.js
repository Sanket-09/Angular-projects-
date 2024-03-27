const jwt = require('jsonwebtoken')
const { findById } = require('../models/user.js')
const User = require('../models/user.js')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'minions want banana', (err, decodedToken) => {
      if (err) {
        res.redirect('/login')
        console.log(err.message)
      } else {
        next()
        console.log(decodedToken)
      }
    })
  } else {
    res.redirect('/login')
  }
}

//check current user

const checkCurrentUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'minions want banana', async (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.locals.user = null
        next()
      } else {
        console.log(decodedToken)
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = { requireAuth, checkCurrentUser }
