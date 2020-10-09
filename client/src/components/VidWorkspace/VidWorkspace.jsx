import React, { useState, useEffect } from 'react'
import './VidWorkspace.scss'
import { connect } from 'react-redux'
import videoListActions from '../../actions/videoList.action'

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
      {props.videoLists.map(videoList => {
        return <div>{videoList.name}</div>
      })}
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
