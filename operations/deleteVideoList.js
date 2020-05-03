// Models
const Video = require('../models/video.model')
const Comment = require('../models/comment.model')
const Like = require('../models/like.model')

module.exports = async id => {
  try {
    const videos = await Video.find({ videoListId: id })

    videos.forEach(async video => {
      // Delete all likes associated with this video
      await Like.deleteMany({ videoId: video._id })

      // Delete all comments associated with this video
      await Comment.deleteMany({ parentId: video._id })

      console.log(`Deleting video id: ${video._id}`)

      await video.remove()
    })
  } catch (err) {
    throw new Error(err)
  }
}

// video id = 5eae2f74527cbc603cc0cd4c