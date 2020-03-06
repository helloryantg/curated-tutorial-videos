const mongoose = require('mongoose')
const { Schema } = mongoose

const videoListSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 50
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('VideoList', videoListSchema)