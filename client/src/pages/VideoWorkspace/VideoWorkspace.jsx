// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Styles
import './VideoWorkspace.scss'
// Components
import LeftTab from '../../components/LeftTab/LeftTab'
import List from '../../components/List/List'
import NavBar from '../../components/NavBar/NavBar'
import VideoCard from '../../components/VideoCard/VideoCard'
import VideoList from '../../components/VideoList/VideoList'
// Actions
import modalActions from '../../actions/modal.action'
import videoListAction from '../../actions/videoList.action'
// Utils
import { isEmpty } from '../../utils/object'
// Constants
import MODAL_CONSTANTS from '../../constants/modal.constants'
// Dependencies
import Loader from 'react-loader-spinner'
import {
  FiEdit,
  FiPlusSquare,
  FiXSquare
} from "react-icons/fi";

function VideoWorkspace(props) {
  const {
    videoLists,
    dispatch,
    user,
    videos
  } = props

  const [isAdding, setAdding] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [newVideoList, setNewVideoList] = useState('')
  const [isFetching, setFetching] = useState(false)

  useEffect(() => {
    if (!isEmpty(user)) {
      dispatch(videoListAction.getUserVideoLists(user._id))
    }
  }, [user, dispatch])

  useEffect(() => {
    if (videoLists.length) {
      setFetching(false)
    }
  }, [videoLists, videos.length])

  useEffect(() => {
    if (activeTabIndex > (videoLists.length - 1)) {
      setActiveTabIndex(0)
    } else if (videoLists.length) {
      dispatch(videoListAction.getVideoListVideos(videoLists[activeTabIndex]._id))
    }
  }, [activeTabIndex, dispatch, videoLists])

  const renderPage = () => {
    const page = 'videoLists'

    let body

    switch (page) {
      case 'videoLists':
        body = <VideoList
          activeTabIndex={activeTabIndex}
          isAdding={isAdding}
          newVideoList={newVideoList}
          setActiveTabIndex={setActiveTabIndex}
          setAdding={setAdding}
          setNewVideoList={setNewVideoList}
          videoLists={videoLists}
        />
    }

    return (
      <div className="main">
        {body}
      </div>
    )
  }

  return (
    <div className="VideoWorkspace">
      <NavBar />
      {isFetching || !videoLists.length ?
        <Loader
          type="Oval"
          className="loader"
          color="#00BFFF"
          height={200}
          width={200}
        // timeout={3000} //3 secs
        />
        :
        renderPage()
      }
    </div>
  )
}

const mapState = ({ reducers }) => {
  return {
    user: reducers.user,
    token: reducers.token,
    videoLists: reducers.videoLists,
    videos: reducers.videos
  }
}

export default connect(mapState)(VideoWorkspace)