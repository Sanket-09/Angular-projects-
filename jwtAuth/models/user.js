const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, ['Please enter a valid email']], //using third party validator
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
})

//below are some mongoose hooks

//fire a function after doc saved to db
userSchema.post('save', (doc, next) => {
  console.log('New user was created and saved ', doc)
  next()
})

//fire a function before a doc is saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email }) //this is used to refer to the user model in the databse

  if (user) {
    const auth = await bcrypt.compare(password, user.password) //comparing the password in database and the use entered password

    if (auth) return user
    throw Error('Incorrect Password')
  }

  throw Error('Incorrect email')
}

const User = mongoose.model('user', userSchema) //parameter 1 : what we want to call out model, should be singular form of the name of the database

module.exports = User
