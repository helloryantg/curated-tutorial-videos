const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const authMiddleware = require('../middlewares/auth')
const VideoList = require('../models/videoList.model')
const User = require('../models/user.model')

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
router.post('/', authMiddleware, async (req, res) => {
  const { 
    name, 
    userId 
  } = req.body
  
  try {
    const foundUser = User.findOne({ _id: userId })

    if (!foundUser) {
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send({ msg: 'You must provide a valid user id' })
    }

    const newVideoList = new VideoList({
      name,
      userId
    })

    await newVideoList.save()

    res
      .status(HttpStatus.OK)
      .send(newVideoList.id)
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router