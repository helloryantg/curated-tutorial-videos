import { server } from '../interfaces/axios.interface'

const createVideo = video => {
  return server.post(`/videos`, video)
    .then(({ data }) => data)
}

const editVideo = video => {
  return server.put(`/videos/${video._id}`, video)
    .then(({ data }) => data)
}

export default {
  createVideo,
  editVideo
}