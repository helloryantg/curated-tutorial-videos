const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
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
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)