const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'comment'
  }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)