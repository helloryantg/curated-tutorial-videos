import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'
import videoListService from '../services/videoList.service'

const getUserVideoLists = (token) => async dispatch => {
  const res = await videoListService.getUserVideoLists(token)
  
  dispatch({
    type: VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS,
    payload: res.data
  })
}

export default {
  getUserVideoLists 
}