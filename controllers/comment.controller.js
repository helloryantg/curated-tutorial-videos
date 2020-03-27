const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const authMiddleware = require('../middlewares/auth')
const Comment = require('../models/comment.model')

// Get all comments  - testing purposes only
router.get('/all', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await Comment.find({}))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Create a comment
router.post('/', authMiddleware, async (req, res) => {
  const {
    parentId,
    body
  } = req.body
  try {
    const comment = new Comment({
      userId: req.userId,
      parentId,
      body
    })

    await comment.save()

    res
      .status(HttpStatus.OK)
      .send(comment.id)
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Get a comment
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.OK)
      .send(await Comment.findOne({ _id: req.params.id }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router