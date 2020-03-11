import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'
import videoListService from '../services/videoList.service'
import likeService from '../services/like.service'

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

  let fullVideosArray = await Promise.all(res.data.map(async vid => {
    let fullVideo = {
      ...vid,
      likesArray: await likeService.getLikesByVideoId(vid._id)
    }

    return fullVideo
  }))

  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEOS_IN_VIDEO_LIST,
    payload: fullVideosArray
  })
}

export default {
  getUserVideoLists,
  createNewVideoList,
  getVideoListVideos
}