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

// Deletes all comments
router.delete('/all', authMiddleware, async (req, res) => {
  try {
    res.status(HttpStatus.NO_CONTENT)
      .send(await Comment.deleteMany({}))
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
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
      parentId,
      body,
      user: req.userId,
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

// Updates a comment
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const options = {
      useFindAndModify: false,
      new: true
    }

    const updates = { body: req.body.body }

    res.status(HttpStatus.OK)
      .send(await Comment.findOneAndUpdate(
        { _id: req.params.id },
        updates,
        options
      ))
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

// Deletes a comment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    res
      .status(HttpStatus.NO_CONTENT)
      .send(await Comment.findOneAndDelete({ _id: req.params.id }))
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ msg: err })
  }
})

module.exports = router