import { server } from '../interfaces/axios.interface'

const createLike = videoId => {
  return server.post('/likes', { videoId })
} 

const deleteLike = id => {
  return server.delete('/likes', { params: { id }})
}

export default {
  createLike,
  deleteLike
}