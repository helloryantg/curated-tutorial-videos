// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './VideoWorkspace.scss'
// Components
import VideoList from '../../components/VideoList/VideoList'
import SearchPage from '../../pages/SearchPage/SearchPage'
// Actions
import videoListAction from '../../actions/videoList.action'
// Utils
import { isEmpty } from '../../utils/object'
// Dependencies
import Loader from 'react-loader-spinner'

function VideoWorkspace(props) {
  const {
    videoLists,
    dispatch,
    user,
    videos,
  } = props

  const [isAdding, setAdding] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [newVideoList, setNewVideoList] = useState('')
  const [isFetching, setFetching] = useState(true)

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

  let body
  if (!user || isFetching) {
    body = <Loader
      type="Oval"
      className="loader"
      color="#00BFFF"
      height={200}
      width={200}
    // timeout={3000} //3 secs
    />
  } else {
    // body = <SearchPage />

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
    <div className="VideoWorkspace">
      <div className="main">
        {body}
      </div>
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