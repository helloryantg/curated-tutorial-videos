import userService from '../services/user.service'

const LOGIN = 'LOGIN'
const SET_USER = 'SET_USER'

export const login = creds => async dispatch => {
  const user = await userService.login(creds)

  return {
    type: LOGIN,
    user
  }
}

export const setUser = user => dispatch => {
  dispatch({
    type: SET_USER,
    user
  })
}