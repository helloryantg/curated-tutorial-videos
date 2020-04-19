// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Styles
import './VideoPage.scss'
// Components
import NavBar from '../../components/NavBar/NavBar'
// Dependencies
import YouTube from 'react-youtube'
// Services
import videoActions from '../../actions/video.action'
// Utils
import videoUtils from '../../utils/video.utils'
import { isEmpty } from '../../utils/object'

function VideoPage(props) {
  const {
    dispatch,
    video,
  } = props

  console.log(video)

  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    dispatch(videoActions.getVideo(props.match.params.id))
  }, [])

  useEffect(() => {
    if (!isEmpty(video)) {
      setVideoId(videoUtils.getVideoIdFromUrl(video.url))
    }
  }, [video])

  const onReady = event => {
    event.target.pauseVideo()
  }

  const opts = {
    // height: '800',
    // width: '800',
    // playerVars: {
    //   autoplay: 1
    // }
  }

  return (
    <div className="VideoPage">
      <NavBar />
      <div className="main">
        <div className="video">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
          />
        </div>
        <div className="details">
          <div className="title">{video.title}</div>
          <div className="description">{video.description}</div>
        </div>
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({
  video: reducers.video
})

export default connect(mapState)(VideoPage)