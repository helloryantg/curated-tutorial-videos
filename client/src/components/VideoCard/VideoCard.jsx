import React, { useState } from 'react'
import './VideoCard.scss'
import YouTube from 'react-youtube'
import {
  IoIosHeart,
  IoIosHeartEmpty
} from 'react-icons/io'
import likeAction from '../../actions/like.action'
import { connect } from 'react-redux'

function VideoCard(props) {
  const {
    video,
    dispatch,
    user
  } = props

  const {
    title,
    views,
    url,
    _id,
    likesArray
  } = video

  const videoId = url.split('=')[1]

  const [isFavorited, setFavorite] = useState(likesArray.some(like => like.userId === user._id))
  const [likesCount, setLikesCount] = useState(likesArray.length)

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
        <div className="edit">
          Edit
        </div>
        <div className="delete">
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
          <div className="title">{title}</div>
          <div
            className="favorite"
            onClick={() => toggleLike()}
          >{isFavorited ? <IoIosHeart className='red' /> : <IoIosHeartEmpty />}</div>
        </div>
        <div className="sub-header">
          <div className="likes">Likes: {likesCount}</div>
          <div className="views">Views: {views}</div>
        </div>
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