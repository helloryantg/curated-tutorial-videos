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
  const {
    url,
    videoListId
  } = req.body
  try {
    const newVideo = new Video({
      url,
      userId: req.userId,
      videoListId
    })

    await newVideo.save()

    res
      .status(HttpStatus.OK)
      .send(newVideo.id)
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Get a video
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await Video.findOne({ _id: req.params.id }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Update a video
router.put('/:id', authMiddleware, async (req, res) => {
  const {
    url,
    likes,
    views,
    isFavored
  } = req.body

  try {
    const options = {
      useFindAndModify: false,
      new: true
    }

    const updates = {
      url,
      likes,
      views,
      isFavored
    }

    res
      .status(HttpStatus.OK)
      .send(await Video.findOneAndUpdate(
        { _id: req.params.id },
        updates,
        options
      ))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.NO_CONTENT)
      .send(await Video.findOneAndDelete({ _id: req.params.id }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router