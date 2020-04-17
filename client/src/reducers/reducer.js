import USER_CONSTANTS from '../constants/user.constants'
import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'
import VIDEO_CONSTANTS from '../constants/video.constants'

const initialState = {
  token: '',
  user: {},
  video: {},
  videoLists: [],
  videos: [],
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

    case VIDEO_CONSTANTS.GET_VIDEO:
      return {
        ...state,
        video: action.payload,
      }

    case USER_CONSTANTS.LOGOUT:
      return {
        ...initialState
      }

    default:
      return state
  }
}

export default reducers