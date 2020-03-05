const router = require('express').Router()
const User = require('../models/user.model')
const HttpStatus = require('http-status-codes')

router.get('/all', async (req, res) => {
  try {
    res.status(HttpStatus.OK).send(await User.find({}))
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).send({ msg: err })
  }
})

router.delete('/:id/delete', async (req, res) => {
  try {
    res.status(HttpStatus.OK).send(await User.deleteOne({ _id: req.params.id }))
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: err })
  }
})

module.exports = router