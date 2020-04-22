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
    comments,
    dispatch,
    video,
    videoPageUser,
  } = props

  const [createdByUser, setCreatedByUser] = useState('')
  const [videoComments, setVideoComments] = useState([])
  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    dispatch(videoActions.getVideo(props.match.params.id))
  }, [])

  useEffect(() => {
    if (!isEmpty(video)) {
      setVideoId(videoUtils.getVideoIdFromUrl(video.url))
    }
  }, [video])

  useEffect(() => {
    if (comments.length) {
      setVideoComments(comments)
    }
  }, [comments])

  useEffect(() => {
    if (videoPageUser) {
      setCreatedByUser(videoPageUser.displayName)
    }
  }, [videoPageUser])

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
          <h2 className="title">{video.title}</h2>
          <p className="userName">{createdByUser}</p>
          <p className="description">{video.description}</p>
          <div className="comments">
            {videoComments.map(comment => {
              return <div className="comment" key={comment._id}>
                <div className="body">{comment.body}</div>
                <div className="user">{comment.user.displayName}</div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({
  comments: reducers.comments,
  video: reducers.video,
  videoPageUser: reducers.videoPageUser,
})

export default connect(mapState)(VideoPage)