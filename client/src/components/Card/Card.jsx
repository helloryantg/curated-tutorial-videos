// React
import React, { useState, useEffect } from 'react'
// Styles
import './Card.scss'
// Dependencies
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
// Service
import userService from '../../services/user.service'

function Card(props) {
  const {
    video,
    dispatch,
  } = props

  const [currentVideo, setCurrentVideo] = useState(video)
  const [videoUser, setVideoUser] = useState({})

  useEffect(() => {
    setCurrentVideo(video)
    console.log(video)
    const user = userService.getUserById(video.userId)
    console.log('user', user)
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
        <div className="title">
          <p>{currentVideo.title}</p>
        </div>
      </div>
    </div>
  )
}

export default Card