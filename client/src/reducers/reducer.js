import USER_CONSTANTS from '../constants/user.constants'

const initialState = {
  user: {}
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_CONSTANTS.SET_USER:
      return {
        ...state,
        user: action.user
      }

    case USER_CONSTANTS.SET_TOKEN:
      return {
        ...state,
        token: action.token
      }


    default:
      return state
  }
}

export default reducers