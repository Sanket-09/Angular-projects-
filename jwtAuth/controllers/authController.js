const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

const errorHandler = (err) => {
  console.log(err.message, err.code) //err.code will be undefined most of the time unless for unique

  let errors = {
    email: '',
    password: '',
  }

  if (err.message == 'Incorrect email')
    errors.email = 'Given email is not registered'

  if (err.message == 'Incorrect Password')
    errors.password = 'Wrong password! Please try again'

  if (err.code == 11000) {
    //duplicate error code
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

const maxAge = 3 * 24 * 60 * 60 //expects time in second , this is 3 days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, 'minions want banana', { expiresIn: maxAge }) //returns token with signature
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
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ userPromise: userPromise._id })
  } catch (error) {
    const errors = errorHandler(error)
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })
  } catch (e) {
    const errors = errorHandler(e)
    res.status(400).json({})
  }
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', 'any random value', { maxAge: 1 })
  res.redirect('/')
}
