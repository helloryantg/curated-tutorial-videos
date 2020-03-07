import React, { useState, useEffect } from 'react'
import './VideoWorkspace.scss'
import NavBar from '../../components/NavBar/NavBar'
import videoListAction from '../../actions/videoList.action'
import { connect } from 'react-redux'

function VideoWorkspace(props) {
  const {
    videoLists
  } = props
  const [isAdding, setAdding] = useState(false)

  useEffect(() => {
    if (props.token) {
      props.dispatch(videoListAction.getUserVideoLists(props.token))
    }
  }, [props.token])

  return (
    <div className="VideoWorkspace">
      <NavBar />
      <div className="main">
        <div className="tabs">
          <div className="title">My Lists</div>
          {videoLists.length ?
            videoLists.map(video => (
              <div className="tab" key={video.key}>{video.name}</div>
            ))
            : <div className="tab">No video lists so far.</div>
          }
          <div className="add-container">
            <button
              onClick={() => setAdding(!isAdding)}
            >Add a new video list</button>
            <div className={`hidden ${isAdding ? 'active' : ''}`}>
              <input type="text" />
              <button
                onClick={() => {
                  setAdding(false)
                }}
              >Add</button>
            </div>
          </div>
        </div>

        <div className="videos-list">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => 
            <div className="video-card">
              <div className="video"></div>
              <div className="description"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => {
  return {
    user: reducers.user,
    token: reducers.token,
    videoLists: reducers.videoLists
  }
}

export default connect(mapState)(VideoWorkspace)