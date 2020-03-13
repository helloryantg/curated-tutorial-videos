import VIDEO_CONSTANTS from '../constants/video.constants'
import videoService from '../services/video.service'

const createVideo = video => async dispatch => {
  const data = await videoService.createVideo(video)

  console.log(data)

  
}

export default {
  createVideo
}