const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const authMiddleware = require('../middlewares/auth')
const Like = require('../models/like.model')

// Get all likes - testing purposes only
router.get('/all', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await Like.find({}))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Create a like
router.post('/', authMiddleware, async (req, res) => {
  const {
    videoId
  } = req.body
  try {
    const newLike = new Like({
      userId: req.userId,
      videoId
    })

    await newLike.save()

    res
      .status(HttpStatus.OK)
      .send(newLike.id)
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})


// Get a like
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await Like.findOne({ _id: req.params.id }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Deletes a like
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.NO_CONTENT)
      .send(await Like.findOneAndDelete({ _id: req.params.id }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router