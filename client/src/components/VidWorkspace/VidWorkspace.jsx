import React, { useState, useEffect } from 'react'
import './VidWorkspace.scss'
import { connect } from 'react-redux'
import videoListActions from '../../actions/videoList.action'
import { Link } from 'react-router-dom'
import VideoList from '../VideoList/VideoList'

function VidWorkspace(props) {
  useEffect(() => {
    
  }, [])

  useEffect(() => {
    getUserVideoLists(props.user._id)
  }, [props.user])

  const getUserVideoLists = (userId) => {
    props.dispatch(videoListActions.getUserVideoLists(userId))
  }

  console.log(props.videoLists)

  return (
    <div className="VidWorkspace">
      <div className="video-lists">
        {props.videoLists.map(videoList => {
          return <Link 
            className="video"
            to={`/list/${videoList._id}`}
          >{videoList.name}</Link>
        })}
      </div>
     
    </div>
  )
}

const mapState = ({ reducers: { user, videoLists } }) => {
  return {
    user,
    videoLists,
  }
}

export default connect(mapState)(VidWorkspace)
