import USER_CONSTANTS from '../constants/user.constants'
import VIDEO_LIST_CONSTANTS from '../constants/videoList.constants'

const initialState = {
  user: {},
  videoLists: []
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

    default:
      return state
  }
}

export default reducers