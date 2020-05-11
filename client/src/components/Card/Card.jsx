// React
import React, { useState, useEffect } from 'react'
// Styles
import './Card.scss'
// Dependencies
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

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
      <div className="description">
        <div className="title">{currentVideo.title}</div>
      </div>
    </div>
  )
}

export default Card