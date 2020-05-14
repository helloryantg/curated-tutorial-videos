// Express
const router = require('express').Router()
// Dependencies
const HttpStatus = require('http-status-codes')
// Middleware
const authMiddleware = require('../middlewares/auth')
// Models
const Comment = require('../models/comment.model')
const Like = require('../models/like.model')
const Video = require('../models/video.model')

// Get all videos
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const videos = await Video
      .find()
      .populate({ path: 'user', model: 'User' })
      .exec()

    res.status(HttpStatus.OK)
      .send(videos)
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Create a video
router.post('/', authMiddleware, async (req, res) => {
  const {
    url,
    videoListId,
    title,
    description,
    userId,
  } = req.body
  
  try {
    const newVideo = new Video({
      url,
      userId: req.userId,
      videoListId,
      title,
      description,
      user: userId,
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
    views,
    title,
    description
  } = req.body

  try {
    const options = {
      useFindAndModify: false,
      new: true
    }

    const updates = {
      url,
      views,
      title,
      description
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

// Deletes a video
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const videoId = req.params.id
    
    // Deletes all likes associated with the video
    await Like.deleteMany({ videoId })

    // Untested 5/2/20
    // Deletes all comments associated with the video
    await Comment.deleteMany({ parentId: videoId })

    // Deletes the video
    res
      .status(HttpStatus.NO_CONTENT)
      .send(await Video.findOneAndDelete({ _id: videoId }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

router.get('/:id/comments', authMiddleware, async (req, res) => {
  try {
    const comments = await Comment.find({ parentId: req.params.id })
      .populate('user')
      .exec()

    res.status(HttpStatus.OK)
      .send(comments)

  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router