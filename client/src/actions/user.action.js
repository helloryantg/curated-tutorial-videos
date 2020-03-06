import userService from '../services/user.service'

const LOGIN = 'LOGIN'
const SET_USER = 'SET_USER'

export const login = creds => async dispatch => {
  const user = userService.login(creds)
  
  return {
    type: LOGIN,
    user
  }
}

export const setUser = user => dispatch => {
  console.log(user)
  dispatch({
    type: SET_USER,
    user
  })
}