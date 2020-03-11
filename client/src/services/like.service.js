import { server } from '../interfaces/axios.interface'

const createLike = videoId => {
  return server.post('/likes', { videoId })
} 

const deleteLike = id => {
  return server.delete('/likes', { params: { id }})
}

const getLikesByVideoId = videoId => {
  return server.get(`/likes/${videoId}/video`)
    .then(({ data }) => data)
}

export default {
  createLike,
  deleteLike,
  getLikesByVideoId
}