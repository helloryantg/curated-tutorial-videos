// Services
// import likeService from '../services/like.service'
// import videoListService from '../services/videoList.service'
import videoService from '../services/video.service'
// Constants
// import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'

const createVideo = video => async dispatch => {
  const data = await videoService.createVideo(video)

  console.log(data)
}

const editVideo = video => async dispatch => {
  const updated = await videoService.editVideo(video)

  // TODO - update the list 
}

export default {
  createVideo,
  editVideo
}