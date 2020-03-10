import LIKE_CONSTANTS from '../constants/like.constants'
import likeService from '../services/like.service'

const createLike = videoId => async (dispatch, getState) => {
  // const res = await likeService.createLike(videoId)
  console.log('video id', videoId)

  console.log(getState())

}

export default {
  createLike
}