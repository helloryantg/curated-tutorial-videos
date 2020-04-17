import axios from 'axios'
import tokenService from '../services/token.service'

const token = tokenService.getToken()

export const server = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 3000,
  headers: { 'Authorization': token }
})