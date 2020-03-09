import React from 'react'
import './VideoCard.scss'
import YouTube from 'react-youtube'

function VideoCard(props) {
  const {
    isFavorited,
    likes,
    title,
    views,
    url
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
        <div className="title">{title}</div>
        <div className="favorite">Favorite? {isFavorited ? 'yes' : 'no'}</div>
        <div className="likes">Likes: {likes}</div>
        <div className="views">Views: {views}</div>
      </div>
    </div>
  )
}

export default VideoCard