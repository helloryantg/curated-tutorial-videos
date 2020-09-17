import { server } from '../interfaces/axios.interface'

const getUserVideoLists = userId => {
  return server.get(`/videoLists/${userId}/user`)
}

const createVideoList = name => {
  return server.post('/videoLists', { name })
}

const getVideoList = id => {
  return server.get(`/videoLists/${id}`);
}

const getVideosFromVideoList = id => {
  return server.get(`/videoLists/${id}/videos`);
}

const updateVideoList = videoList => {
  return server.put(`videoLists/${videoList._id}`, videoList)
    .then(({ data }) => data)
}

const deleteVideoList = id => {
  return server.delete(`videoLists/${id}`)
}

export default {
  getUserVideoLists,
  createVideoList,
  getVideoList,
  getVideosFromVideoList,
  updateVideoList,
  deleteVideoList,
}