import tokenService from './token.service'
import axios from 'axios'

const BASE_URL = 'http://localhost:4000/auth'

const signup = async user => {
  const res = await axios.post(`${BASE_URL}/register`, user)

  const token = res.data.token

  if (token) {
    tokenService.setToken(token)
  } else {
    throw new Error('Email already taken')
  }

  return res.data
}

const login = async creds => {
  const res = await axios.post(`${BASE_URL}/login`, creds)
  
  const token = res.data.token

  if (token) {
    tokenService.setToken(token)
  } else {
    throw new Error('Bad credentials')
  }

  return res.data
}

const getUser = () => tokenService.getUserFromToken()

const logout = () => tokenService.removeToken()

export default {
  signup,
  login,
  getUser,
  logout
}