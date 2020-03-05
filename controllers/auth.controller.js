const router = require('express').Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')

const createJWT = userId => jwt.sign({ userId }, process.env.SECRET, { expiresIn: '24h' })

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

    res.status(HttpStatus.OK).send({ token: createJWT(newUser.id) })
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send(err)
  }
})

module.exports = router