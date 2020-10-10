import userService from '../services/user.service'
import tokenService from '../services/token.service'
import USER_CONSTANTS from '../constants/user.constants'

export const login = creds => async dispatch => {
  const data = await userService.login(creds)

  dispatch({
    type: USER_CONSTANTS.SET_TOKEN,
    payload: data.token
  })

  dispatch({
    type: USER_CONSTANTS.SET_USER,
    payload: data.user
  })
}

const signUp = (creds) => async dispatch => {
  const data = await userService.signup(creds)

  console.log(data)

  dispatch({
    type: USER_CONSTANTS.SET_TOKEN,
    payload: data.token
  })

  dispatch({
    type: USER_CONSTANTS.SET_USER,
    payload: data.user
  })
}

export const logout = () => async dispatch => {
  userService.logout()

  dispatch({
    type: USER_CONSTANTS.LOGOUT,
    payload: ''
  })
}

export const getUserFromToken = () => async dispatch => {
  dispatch({
    type: USER_CONSTANTS.SET_USER,
    payload: await userService.getUser()
  })

  dispatch({
    type: USER_CONSTANTS.SET_TOKEN,
    payload: await tokenService.getToken()
  })
}

export const setUser = user => dispatch => {
  dispatch({
    type: USER_CONSTANTS.SET_USER,
    payload: user
  })
}

export const getUserVideos = (userId) => async dispatch => {
  const videos = await userService.getUserVideos(userId)

  dispatch({
    type: USER_CONSTANTS.GET_USER_VIDEOS,
    payload: videos,
  })
}

export default {
  login,
  signUp,
  logout,
  getUserFromToken,
  setUser,
  getUserVideos,
}