// Dependencies
import axios from 'axios'
// Services
import tokenService from './token.service'
// Interfaces
import { server } from '../interfaces/axios.interface'

const BASE_URL = 'http://localhost:4000/api/auth'

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

const getUserDetails = async id => {
  try {
    const res = await server.get(`http://localhost:4000/api/users/${id}`)

    return res.data
  } catch (err) {
    throw new Error(err)
  }
}

const USER_BASE_URL = 'http://localhost:4000/api/users'

const getUserById = async id => {
  try {
    const res = await server.get(`${USER_BASE_URL}/${id}`)

    console.log(res)

    return res.data
  } catch (err) {
    throw new Error(err)
  }
}

export default {
  signup,
  login,
  getUser,
  logout,
  getUserDetails,
  getUserById,
}