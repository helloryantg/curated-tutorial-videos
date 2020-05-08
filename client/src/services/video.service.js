import { server } from '../interfaces/axios.interface'

const createVideo = video => {
  return server.post(`/videos`, video)
    .then(({ data }) => data)
}

const editVideo = video => {
  return server.put(`/videos/${video._id}`, video)
    .then(({ data }) => data)
}

const getVideo = id => {
  return server.get(`/videos/${id}`)
    .then(({ data }) => data)
}

const deleteVideo = video => {
  return server.delete(`/videos/${video._id}`)
    .then(({ data }) => data)
}

const getVideoComments = id => {
  return server.get(`/videos/${id}/comments`)
    .then(({ data }) => data)
}

const getAllVideos = () => {
  return server.get('/videos/all')
    .then(({ data }) => data)
}

export default {
  createVideo,
  editVideo,
  getVideo,
  deleteVideo,
  getVideoComments,
  getAllVideos,
}