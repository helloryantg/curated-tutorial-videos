// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './VideoCard.scss'
// Dependencies
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
// Actions
import modalActions from '../../actions/modal.action'
import videoActions from '../../actions/video.action'
// Constants
import MODAL_CONSTANTS from '../../constants/modal.constants'
// Utils
import videoUtils from '../../utils/video.utils'

function VideoCard(props) {
  const {
    video,
    dispatch,
  } = props

  const {
    url,
    _id,
  } = video

  const videoId = videoUtils.getVideoIdFromUrl(url)

  // const [isFavorited, setFavorite] = useState(likesArray.some(like => like.userId === user._id))
  // const [likesCount, setLikesCount] = useState(likesArray.length)
  const [currentVideo, setCurrentVideo] = useState(video)

  useEffect(() => {
    setCurrentVideo(video)
  }, [video])

  // const toggleLike = () => {
  //   if (isFavorited) {
  //     const foundLike = likesArray.find(like => like.userId === user._id)

  //     if (foundLike) {
  //       dispatch(likeAction.deleteLike(foundLike._id))
  //     } else {
  //       throw Error('Unable to delete like')
  //     }
  //     setLikesCount(likesCount - 1)
  //   } else {
  //     dispatch(likeAction.createLike(_id))
  //     setLikesCount(likesCount + 1)
  //   }

  //   setFavorite(!isFavorited)
  // }

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
        <ReactPlayer
          url={video.url}
          light={true}
          height={'100%'}
          width={'100%'}
        />
      </div>
      <div className="description">
        <div className="header">
          <Link to={`video/${_id}`} className="title">{currentVideo.title}</Link>
        </div>
        <div className="sub-header">
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
    user: reducers.user,
  }
}

export default connect(mapState)(VideoCard)