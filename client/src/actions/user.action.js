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

export const logout = () => async dispatch => {
  userService.logout()

  console.log('logging out')

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

export default {
  login,
  logout,
  getUserFromToken,
  setUser
}