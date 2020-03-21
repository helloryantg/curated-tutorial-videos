import { server } from '../interfaces/axios.interface'

const createVideo = video => {
  return server.post(`/videos`, video)
    .then(({ data }) => data)
}

const editVideo = video => {
  return server.put(`/videos/${video._id}`, video)
    .then(({ data }) => data)
}

const getVideo = video => {
  return server.get(`/videos/${video._id}`)
    .then(({ data }) => data)
}

const deleteVideo = video => {
  return server.delete(`/videos/${video._id}`)
    .then(({ data }) => data)
}

export default {
  createVideo,
  editVideo,
  getVideo,
  deleteVideo
}