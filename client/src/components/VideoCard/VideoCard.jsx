import React from 'react'
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
    dispatch
  } = props

  const {
    isFavorited,
    likes,
    title,
    views,
    url,
    _id
  } = props.video

  const videoId = url.split('=')[1]

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

  return (
    <div className="VideoCard">
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
            onClick={() => dispatch(likeAction.createLike(_id))}
          >{isFavorited ? <IoIosHeart /> : <IoIosHeartEmpty />}</div>
        </div>
        <div className="sub-header">
          <div className="likes">Likes: {likes}</div>
          <div className="views">Views: {views}</div>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {}
}

export default connect(mapState)(VideoCard)