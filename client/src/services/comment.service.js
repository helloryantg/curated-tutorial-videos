import { server } from '../interfaces/axios.interface'

// Untested
const createComment = comment => {
  return server.post('/comments', comment)
    .then(({ data }) => data)
}

// Untested
const editComment = comment => {
  return server.put(`/comments/${comment._id}`, comment)
    .then(({ data }) => data)
}

// Untested
const getComment = id => {
  return server.get(`'/videos/${id}`)
    .then(({ data }) => data)
}

// Untested
const deleteComment = id => {
  return server.delete(`/videos/${id}`)
    .then(({ data }) => data)
}

export default {
  createComment,
  editComment,
  getComment,
  deleteComment,
}