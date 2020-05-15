// React
import React, { useState, useEffect } from 'react'
// Styles
import './Card.scss'
// Dependencies
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import moment from 'moment'

function Card(props) {
  const {
    video,
    dispatch,
  } = props

  const [currentVideo, setCurrentVideo] = useState(video)

  useEffect(() => {
    setCurrentVideo(video)
  }, [video])

  return (
    <div className="Card">
      <div className="video">
        <ReactPlayer
          url={currentVideo.url}
          light={true}
          height={'100%'}
          width={'100%'}
        />
      </div>
      <div className="details">
        <div className="logo-container">
          <div className="logo"></div>
        </div>
        <div className="detail">
          <p className="title">{currentVideo.title}</p>
          <p className="user">{Object.keys(currentVideo).includes('user') ? currentVideo.user.displayName : 'user'}</p>
          <p className="created-time">{moment(currentVideo.createdAt).format("MMM Do YY")}</p>
        </div>
      </div>
    </div>
  )
}

export default Card