import { server } from '../interfaces/axios.interface'

const getUserVideoLists = (userId) => {
  return server.get(`/videoLists/${userId}/user`)
}

const createVideoList = name => {
  return server.post('/videoLists', { name })
}

const getVideosFromVideoList = id => {
  return server.get(`/videoLists/${id}/videos`)
}

const updateVideoList = videoList => {
  return server.put(`videoLists/${videoList._id}`, videoList)
    .then(({ data }) => data)
}

export default {
  getUserVideoLists,
  createVideoList,
  getVideosFromVideoList,
  updateVideoList
}