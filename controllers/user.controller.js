const router = require('express').Router()
const User = require('../models/user.model')
const HttpStatus = require('http-status-codes')
const authMiddleware = require('../middlewares/auth')

// Get all users
router.get('/all', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await User.find({}))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Get user
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await User.findById(req.params.id))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await User.deleteOne({ _id: req.params.id }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router