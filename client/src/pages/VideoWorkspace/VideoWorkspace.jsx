import React from 'react'
import './VideoWorkspace.scss'
import NavBar from '../../components/NavBar/NavBar'

function VideoWorkspace(props) {
  return (
    <div className="VideoWorkspace">
      <NavBar />
      <div className="main">
        <div className="tabs">
          <div className="title">My Lists</div>
          {/* List goes here */}
        </div>

        <div className="videos-list">
          
        </div>  
      </div>
    </div>
  )
}

export default VideoWorkspace