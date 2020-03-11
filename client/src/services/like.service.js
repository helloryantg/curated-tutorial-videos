import { server } from '../interfaces/axios.interface'

const createLike = videoId => {
  return server.post('/likes', { videoId })
    .then(({ data }) => data)
} 

const deleteLike = id => {
  return server.delete(`/likes/${id}`)
    .then(({ data }) => data)
}

const getLike = id => {
  return server.get('/likes', { params: { id }})
    .then(({ data }) => data)
}

const getLikesByVideoId = videoId => {
  return server.get(`/likes/${videoId}/video`)
    .then(({ data }) => data)
}

export default {
  createLike,
  deleteLike,
  getLike,
  getLikesByVideoId
}