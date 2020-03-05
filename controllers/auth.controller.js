const router = require('express').Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')

const createJWT = id => jwt.sign({ id }, process.env.SECRET, { expiresIn: '24h' })

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
    res.status(HttpStatus.BAD_REQUEST).send({ msg: err })
  }
})

router.get('/validate/:token', async (req, res) => {
  const { token } = req.params
  
  if (!token) {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ msg: 'You must provide a token to authenticate' })
  }

  try {
    const verified = await jwt.verify(token, process.env.SECRET)

    console.log('id', verified)

    res.status(HttpStatus.OK).send({ id: verified.id })
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: '' })
  }
})

module.exports = router