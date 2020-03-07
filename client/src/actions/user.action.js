import userService from '../services/user.service'
import tokenService from '../services/token.service'
import videoListService from '../services/videoList.service'
import USER_CONSTANTS from '../constants/user.constants'

export const login = creds => async dispatch => {
  const data = await userService.login(creds)

  dispatch({
    type: USER_CONSTANTS.SET_TOKEN,
    token: data.token
  })

  dispatch({
    type: USER_CONSTANTS.SET_USER,
    user: data.user
  })
}

export const getUserFromToken = () => async dispatch => {
  dispatch({
    type: USER_CONSTANTS.SET_USER,
    user: await userService.getUser()
  })

  dispatch({
    type: USER_CONSTANTS.SET_TOKEN,
    token: await tokenService.getToken()
  })
}

export const setUser = user => dispatch => {
  dispatch({
    type: USER_CONSTANTS.SET_USER,
    user
  })
}

export const getUserVideoLists = (userId, token) => async dispatch => {
  console.log(userId)
  const videoLists = await videoListService.getUserVideoLists(userId, token)
  console.log(videoLists)

  // console.log(videoLists)
}