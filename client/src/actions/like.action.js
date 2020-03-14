import likeService from '../services/like.service'

const createLike = videoId => async (dispatch, getState) => {
  // TODO - unfinished
  // const newLikeId = await likeService.createLike(videoId)
}

const deleteLike = id => async dispatch => {
  await likeService.deleteLike(id)
}

export default {
  createLike,
  deleteLike
}