import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'
import videoListService from '../services/videoList.service'
import likeService from '../services/like.service'

const getUserVideoLists = userId => async dispatch => {
  const res = await videoListService.getUserVideoLists(userId)

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS,
    payload: res.data
  })
}

const createNewVideoList = videoList => async (dispatch, getState) => {
  await videoListService.createVideoList(videoList.name)

  const res = await videoListService.getUserVideoLists(getState().reducers.user._id)

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS,
    payload: res.data
  })
}

const getVideoList = videoListId => async (dispatch, getState) => {
  const res = await videoListService.getVideoList(videoListId)

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEO_LIST,
    payload: res.data
  })
}

const getVideoListVideos = id => async dispatch => {
  const res = await videoListService.getVideosFromVideoList(id)

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEOS_IN_VIDEO_LIST,
    payload: res.data
  })
}

const updateVideoList = videoList => async (dispatch, getState) => {
  const data = await videoListService.updateVideoList(videoList)

  const videoLists = getState().reducers.videoLists
  const videoIndex = videoLists.findIndex(video => video._id === videoList._id)
  videoLists.splice(videoIndex, 1, data)

  const newVideoList = [...videoLists]

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS,
    payload: newVideoList
  })
}

const deleteVideoList = id => async (dispatch, getState) => {
  await videoListService.deleteVideoList(id)

  const { videoLists } = getState().reducers

  const filteredList = [...videoLists.filter(video => video._id !== id)]

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS,
    payload: filteredList
  })
}

export default {
  getUserVideoLists,
  createNewVideoList,
  getVideoList,
  getVideoListVideos,
  updateVideoList,
  deleteVideoList,
}