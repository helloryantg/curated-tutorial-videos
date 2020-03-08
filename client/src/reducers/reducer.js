import USER_CONSTANTS from '../constants/user.constants'
import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'

const initialState = {
  user: {},
  videoLists: [],
  videos: []
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONSTANTS.SET_USER:
      return {
        ...state,
        user: action.payload
      }

    case USER_CONSTANTS.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }

    case VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS:
      return {
        ...state,
        videoLists: action.payload
      }

    case VIDEO_LIST_CONSTANTS.SET_VIDEOS_IN_VIDEO_LIST:
      return {
        ...state,
        videos: action.payload
      }

    default:
      return state
  }
}

export default reducers