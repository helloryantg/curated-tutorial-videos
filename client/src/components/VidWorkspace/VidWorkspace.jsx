import React, { useState, useEffect } from 'react'
import './VidWorkspace.scss'
import { connect } from 'react-redux'
import videoListActions from '../../actions/videoList.action'
import { Link } from 'react-router-dom'
import VideoList from '../VideoList/VideoList'
import userActions from '../../actions/user.action'
import ReactPlayer from "react-player"

function VidWorkspace(props) {
  useEffect(() => {
    
  }, [])

  useEffect(() => {
    const { _id: userId } = props.user
    getUserVideoLists(userId)
    getUserVideos(userId)
  }, [props.user])

  const getUserVideoLists = (userId) => {
    props.dispatch(videoListActions.getUserVideoLists(userId))
  }

  const getUserVideos = (userId) => {
    props.dispatch(userActions.getUserVideos(userId))
  }

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
     <div className="videos">
       {props.userVideos.map(video => {
         return <div className="video">
           <ReactPlayer
            url={video.url}
            light={true}
            width={"100%"}
            height={"100%"}
          />
          <div className="title">{video.title}</div>
         </div>
       })}
     </div>
    </div>
  )
}

const mapState = ({ reducers: { user, videoLists, userVideos, } }) => {
  return {
    user,
    videoLists,
    userVideos,
  }
}

export default connect(mapState)(VidWorkspace)
