const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

const errorHandler = (err) => {
  console.log(err.message, err.code) //err.code will be undefined most of the time unless for unique
  let errors = {
    email: '',
    password: '',
  }

  //duplicate error code
  if (err.code == 11000) {
    errors.email = 'That email is already registered'
    return errors
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach((error) => {
      console.log(error.properties)
      errors[error.properties.path] = error.properties.message
    })
  }

  return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
  return jwt.sign({ id }, 'minions want banana', { expiresIn: maxAge })
}

module.exports.signup_get = (req, res) => {
  res.render('signup')
}

module.exports.login_get = (req, res) => {
  res.render('login')
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const userPromise = await User.create({ email, password }) //asynchronous task and returns a promise
    const token = createToken(userPromise._id)
    res.cookie('jwt'.token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ userPromise: userPromise._id })
  } catch (error) {
    const errors = errorHandler(error)
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  res.send('new user login')
  const { email, password } = req.body
  console.log(email, password)
}
