import USER_CONSTANTS from '../constants/user.constants'
import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'
import VIDEO_CONSTANTS from '../constants/video.constants'
import SEARCH_CONSTANTS from '../constants/search.constants'

const initialState = {
  allVideos: [],
  token: '',
  user: {},
  video: {},
  videoList: {},
  videoLists: [],
  videoPageUser: {},
  videos: [],
  comments: [],
  searchText: ''
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

    case VIDEO_CONSTANTS.SET_VIDEO_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }

    case VIDEO_LIST_CONSTANTS.SET_VIDEO_LIST:
      return {
        ...state,
        videoList: action.payload
      }

    case VIDEO_LIST_CONSTANTS.SET_VIDEO_LISTS:
      return {
        ...state,
        videoLists: action.payload
      }

    case VIDEO_CONSTANTS.SET_VIDEO_PAGE_USER:
      return {
        ...state,
        videoPageUser: action.payload
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
        ...initialState,
      }

    case VIDEO_CONSTANTS.GET_ALL_VIDEOS:
      return {
        ...state,
        allVideos: action.payload,
      }

    case SEARCH_CONSTANTS.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      }

    default:
      return state
  }
}

export default reducers