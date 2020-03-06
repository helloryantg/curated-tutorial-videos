const mongoose = require('mongoose')
const { Schema } = mongoose

const videoSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  isFavorited: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Video', videoSchema)