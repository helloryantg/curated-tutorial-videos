import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'
import videoListService from '../services/videoList.service'

const getUserVideoLists = (userId) => async dispatch => {
  const res = await videoListService.getUserVideoLists(userId)
  
  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS,
    payload: res.data
  })
}

const createNewVideoList = name => async dispatch => {
  await videoListService.createVideoList(name)

  const res = await videoListService.getUserVideoLists()

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS,
    payload: res.data
  })
}

const getVideoListVideos = id => async dispatch => {
  const res = await videoListService.getVideosFromVideoList(id)

    type: VIDEO_LIST_CONSTANTS.SET_VIDEOS_IN_VIDEO_LIST,
    payload: res.data
  })
}

export default {
  getUserVideoLists,
  createNewVideoList,
  getVideoListVideos
}