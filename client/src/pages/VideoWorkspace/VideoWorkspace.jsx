import React, { useState, useEffect } from 'react'
import './VideoWorkspace.scss'
import NavBar from '../../components/NavBar/NavBar'
import videoListAction from '../../actions/videoList.action'
import { connect } from 'react-redux'
import { isEmpty } from '../../utils/object'

function VideoWorkspace(props) {
  const [isAdding, setAdding] = useState(false)
  const [videoList, setVideoList] = useState([])

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
          {/* List goes here */}
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

        </div>
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => {
  return {
    user: reducers.user,
    token: reducers.token
  }
}

export default connect(mapState)(VideoWorkspace)