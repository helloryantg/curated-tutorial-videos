import axios from 'axios'

const BASE_URL = 'http://localhost:4000/videoLists'

const getUserVideoLists = token => {
  return axios.get(`${BASE_URL}/user`, {
    headers: { 'Authorization': `${token}` }
  })
}

export default {
  getUserVideoLists
}