import tokenService from './token.service'
import axios from 'axios'

const BASE_URL = 'http://localhost:4000/auth'

export const signup = async user => {
  return await axios.post(`${BASE_URL}/register`, user)
}

const getUser = () => tokenService.getUserFromToken()

const logout = () => tokenService.removeToken()