const mongoose = require('mongoose')
const { Schema } = mongoose

const likeSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'like'
  }
}, { timestamps: true })

module.exports = mongoose.model('Like', likeSchema)