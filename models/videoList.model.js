const mongoose = require('mongoose')
const { Schema } = mongoose

const videoListSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 50,
  },
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'videoList',
  },
  description: {
    type: String,
    max: 150,
  }
}, { timestamps: true })

module.exports = mongoose.model('VideoList', videoListSchema)