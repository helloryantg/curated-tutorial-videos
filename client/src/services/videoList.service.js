import axios from 'axios'
import tokenService from '../services/token.service'
import { server } from '../interfaces/axios.interface'

const getUserVideoLists = () => {
  return server.get('/videoLists/user')
}

const createVideoList = name => {
  return server.post('/videoLists', { name })
}

export default {
  getUserVideoLists,
  createVideoList
}