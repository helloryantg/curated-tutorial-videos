const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const authMiddleware = require('../middlewares/auth')
const VideoList = require('../models/videoList.model')

// Get all video lists
router.get('/all', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await VideoList.find({}))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Create a video list

module.exports = router