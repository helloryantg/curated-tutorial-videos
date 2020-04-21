// Services
import userService from '../services/user.service'
import videoService from '../services/video.service'
// Constants
import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'
import VIDEO_CONSTANTS from '../constants/video.constants'

const createVideo = video => async dispatch => {
  const data = await videoService.createVideo(video)

  // TODO - add to state
}

const getVideo = id => async dispatch => {
  try {
    const data = await videoService.getVideo(id)

    dispatch({ 
      type: VIDEO_CONSTANTS.GET_VIDEO, 
      payload: data, 
    })

    const userData = await userService.getUserDetails(data.userId)

    dispatch({
      type: VIDEO_CONSTANTS.SET_VIDEO_PAGE_USER,
      payload: userData,
    })
  } catch (err) {
    throw new Error(err)
  }
}

const editVideo = video => async dispatch => {
  const updated = await videoService.editVideo(video)

  // TODO - update the list 
}

const deleteVideo = video => async (dispatch, getState) => {
  await videoService.deleteVideo(video)

  const { videos } = getState().reducers
  
  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEOS_IN_VIDEO_LIST,
    payload: videos.filter(vid => vid._id !== video._id)
  })
}

export default {
  createVideo,
  editVideo,
  deleteVideo,
  getVideo,
}