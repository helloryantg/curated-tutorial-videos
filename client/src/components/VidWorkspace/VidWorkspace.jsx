import React, { useState, useEffect } from 'react'
import './VidWorkspace.scss'
import { connect } from 'react-redux'
import videoListActions from '../../actions/videoList.action'
import { Link } from 'react-router-dom'
import userActions from '../../actions/user.action'
import ReactPlayer from "react-player"

function VidWorkspace(props) {
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
            key={videoList._id}
          >{videoList.name}</Link>
        })}
      </div>
     <div className="videos">
       {props.userVideos
        .filter(video => video.description.toLowerCase().includes(props.searchText.toLowerCase()))
        .map(video => {
         return <div className="video" key={video._id}>
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

const mapState = ({ reducers: { user, videoLists, userVideos, searchText, } }) => {
  return {
    user,
    videoLists,
    userVideos,
    searchText,
  }
}

export default connect(mapState)(VidWorkspace)
