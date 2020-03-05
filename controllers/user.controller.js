const router = require('express').Router()
const User = require('../models/user.model')
const HttpStatus = require('http-status-codes')

router.get('/all', async (req, res) => {
  try {
    res.status(HttpStatus.OK).send(await User.find({}))
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send(err)
  }
})

module.exports = router