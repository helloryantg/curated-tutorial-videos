// Services
import userService from '../services/user.service'
import videoService from '../services/video.service'
import videoListService from '../services/videoList.service'
// Constants
import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'
import VIDEO_CONSTANTS from '../constants/video.constants'

const createVideo = video => async dispatch => {
  try {
    await videoService.createVideo(video)

    const { data } = await videoListService.getVideosFromVideoList(video.videoListId)

    dispatch({
      type: VIDEO_CONSTANTS.SET_VIDEOS_IN_VIDEO_LIST,
      payload: data
    })
  } catch (err) {
    console.error(err)
  }
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

    const comments = await videoService.getVideoComments(id)

    dispatch({
      type: VIDEO_CONSTANTS.SET_VIDEO_COMMENTS,
      payload: comments
    })
  } catch (err) {
    throw new Error(err)
  }
}

const editVideo = video => async (dispatch, getState) => {
  const updated = await videoService.editVideo(video)

  const { videos } = getState().reducers
  const videoIndex = videos.findIndex(vid => vid._id === updated._id)

  const videosArr = [...videos]

  videosArr.splice(videoIndex, 1, updated)

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEOS_IN_VIDEO_LIST,
    payload: videosArr
  })
}

const deleteVideo = video => async (dispatch, getState) => {
  await videoService.deleteVideo(video)

  const { videos } = getState().reducers

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEOS_IN_VIDEO_LIST,
    payload: videos.filter(vid => vid._id !== video._id)
  })
}

const getAllVideos = () => async dispatch => {
  const allVideos = await videoService.getAllVideos()

  dispatch({
    type: VIDEO_CONSTANTS.GET_ALL_VIDEOS,
    payload: allVideos
  })
}

export default {
  createVideo,
  editVideo,
  deleteVideo,
  getVideo,
  getAllVideos,
}