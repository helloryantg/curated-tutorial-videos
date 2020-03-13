import { server } from '../interfaces/axios.interface'

const createVideo = video => {
  return server.post(`/videos`, video)
    .then(({ data }) => data)
}

export default {
  createVideo
}