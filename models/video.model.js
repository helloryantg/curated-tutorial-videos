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
  views: {
    type: Number,
    default: 0
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
  },
  type: {
    type: String,
    default: 'video'
  }
}, { timestamps: true })

module.exports = mongoose.model('Video', videoSchema)