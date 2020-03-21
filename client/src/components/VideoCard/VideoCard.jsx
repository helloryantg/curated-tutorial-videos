// React
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './VideoCard.scss'
// Dependencies
import YouTube from 'react-youtube'
import {
  IoIosHeart,
  IoIosHeartEmpty
} from 'react-icons/io'
// Actions
import likeAction from '../../actions/like.action'
import modalActions from '../../actions/modal.action'
import videoActions from '../../actions/video.action'
// Constants
import MODAL_CONSTANTS from '../../constants/modal.constants'

function VideoCard(props) {
  const {
    video,
    dispatch,
    user
  } = props

  const {
    url,
    _id,
    likesArray
  } = video

  const videoId = url.split('=')[1]

  const [isFavorited, setFavorite] = useState(likesArray.some(like => like.userId === user._id))
  const [likesCount, setLikesCount] = useState(likesArray.length)
  const [currentVideo, setCurrentVideo] = useState(video)

  const opts = {
    // height: '160',
    // width: '200',
    // playerVars: {
    //   autoplay: 1
    // }
  }

  const onReady = event => {
    event.target.pauseVideo()
  }

  const toggleLike = () => {
    if (isFavorited) {
      const foundLike = likesArray.find(like => like.userId === user._id)

      if (foundLike) {
        dispatch(likeAction.deleteLike(foundLike._id))
      } else {
        throw Error('Unable to delete like')
      }
      setLikesCount(likesCount - 1)
    } else {
      dispatch(likeAction.createLike(_id))
      setLikesCount(likesCount + 1)
    }

    setFavorite(!isFavorited)
  }

  return (
    <div className="VideoCard">
      <div className="header">
        <div className="edit"
          onClick={() => dispatch(modalActions.showModal({
            modalType: MODAL_CONSTANTS.EDIT_VIDEO_MODAL,
            modalProps: { video: currentVideo }
          }))}
        >
          Edit
        </div>
        <div className="delete"
          onClick={() => {
            dispatch(videoActions.deleteVideo(currentVideo))
          }}
        >
          Delete
        </div>
      </div>
      <div className="video">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
        />
      </div>
      <div className="description">
        <div className="header">
          <div className="title">{currentVideo.title}</div>
          <div
            className="favorite"
            onClick={() => toggleLike()}
          >{isFavorited ? <IoIosHeart className='red' /> : <IoIosHeartEmpty />}</div>
        </div>
        <div className="sub-header">
          <div className="likes">Likes: {likesCount}</div>
          <div className="views">Views: {currentVideo.views}</div>
        </div>
        <div className="notes">{currentVideo.description}</div>
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => {
  return {
    videos: reducers.videos,
    user: reducers.user
  }
}

export default connect(mapState)(VideoCard)