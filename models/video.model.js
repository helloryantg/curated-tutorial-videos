const mongoose = require('mongoose')
const { Schema } = mongoose

const videoSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  userId: {
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
  },
  videoListId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    max: 150
  },
  description: {
    type: String,
    max: 1500
  }
}, { timestamps: true })

module.exports = mongoose.model('Video', videoSchema)