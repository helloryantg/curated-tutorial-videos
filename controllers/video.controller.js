const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const authMiddleware = require('../middlewares/auth')
const Video = require('../models/video.model')

// Get all videos
router.get('/all', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await Video.find({}))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Create a video
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newVideo = new Video({ 
      url: req.body.url,
      userId: req.userId 
    })

    await newVideo.save()

    res
      .status(HttpStatus.OK)
      .send(newVideo.id)
  } catch(err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router