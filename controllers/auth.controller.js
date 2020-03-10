const router = require('express').Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')

const createJWT = id => jwt.sign({ id }, process.env.SECRET, { expiresIn: '24h' })

// Create a user and return a token
router.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    displayName,
    email,
    password
  } = req.body

  try {
    const newUser = new User({
      firstName,
      lastName,
      displayName,
      email,
      password
    })

    await newUser.save()

    res
      .status(HttpStatus.OK)
      .send({ 
        token: createJWT(newUser.toJSON()),
        user: newUser.toJSON() 
      })
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ msg: err })
  }
})

// Validate token
router.post('/validate', async (req, res) => {
  const { token } = req.body

  if (!token) {
    res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .send({ msg: 'You must provide a token to authenticate' })
  }

  try {
    const verified = await jwt.verify(token, process.env.SECRET)

    res
      .status(HttpStatus.OK)
      .send({ id: verified.id })
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: '' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const {
    email,
    password
  } = req.body

  try {
    const foundUser = await User.findOne({ email }).exec()
    const isMatch = await foundUser.comparePassword(password)

    if (isMatch) {
      res
        .status(HttpStatus.OK)
        .send({ 
          token: createJWT(foundUser.toJSON()),
          user: foundUser.toJSON() 
        })
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ msg: 'Invalid Credentials' })
    }
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: error })
  }
})

module.exports = router