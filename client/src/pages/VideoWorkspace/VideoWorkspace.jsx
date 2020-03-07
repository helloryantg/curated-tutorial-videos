import React, { useState } from 'react'
import './VideoWorkspace.scss'
import NavBar from '../../components/NavBar/NavBar'

function VideoWorkspace(props) {
  const [isAdding, setAdding] = useState(false)

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

export default VideoWorkspace