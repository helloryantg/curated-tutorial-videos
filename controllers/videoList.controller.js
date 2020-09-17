// Express
const router = require('express').Router()
// Dependencies
const HttpStatus = require('http-status-codes')
// Middlewares
const authMiddleware = require('../middlewares/auth')
// Models
const VideoList = require('../models/videoList.model')
const User = require('../models/user.model')
const Video = require('../models/video.model')
const Like = require('../models/like.model')
// Operations
const deleteVideoList = require('../operations/deleteVideoList')

// Create a video list
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body
  const { userId } = req

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

// Get a video list
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    res
    .status(HttpStatus.OK)
      .send(await VideoList.findById(req.params.id))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Update a video list
router.put('/:id', authMiddleware, async (req, res) => {
  const { name } = req.body

  try {
    const options = {
      useFindAndModify: false,
      new: true
    }

    const updates = {
      name
    }

    res
      .status(HttpStatus.OK)
      .send(await VideoList.findOneAndUpdate(
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

// Delete a video
router.delete('/:id', authMiddleware, async (req, res) => {
  const videoListId = req.params.id

  try {
    // Deletes all likes, comments, and videos associated with this video list
    await deleteVideoList(videoListId)

    Video.deleteMany({ videoListId })
      .then(() => {
        console.log('Deleted many');
      })
      .catch(error => {
        console.error(error);
        next(error);
      })

    res
      .status(HttpStatus.NO_CONTENT)
      .send(await VideoList.findOneAndDelete({ _id: req.params.id }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

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

// Get all user video lists
router.get('/:userId/user', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await VideoList.find({ userId: req.params.userId }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Get all video list videos
router.get('/:id/videos', authMiddleware, async (req, res) => {
  try {
    const videos = await Video
      .find({ videoListId: req.params.id })
      .sort('createdAt');

    res
      .status(HttpStatus.OK)
      .send(videos);
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router