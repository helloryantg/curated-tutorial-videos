// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './VideoWorkspace.scss'
// Components
import NavBar from '../../components/NavBar/NavBar'
import VideoCard from '../../components/VideoCard/VideoCard'
// Actions
import modalActions from '../../actions/modal.action'
import videoListAction from '../../actions/videoList.action'
// Utils
import { isEmpty } from '../../utils/object'
// Constants
import MODAL_CONSTANTS from '../../constants/modal.constants'
// Dependencies
import Loader from 'react-loader-spinner'

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

  return (
    <div className="VideoWorkspace">
      <NavBar />
      {isFetching ?
        <Loader
          type="Oval"
          className="loader"
          color="#00BFFF"
          height={200}
          width={200}
        // timeout={3000} //3 secs
        />
        :
        <div className="main">
          <div className="tabs">
            <div className="title">My Lists</div>
            {videoLists.length ?
              videoLists.map((video, index) => (
                <div
                  className={`tab ${activeTabIndex === index ? 'active' : ''}`}
                  key={video._id}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {video.name}
                </div>
              ))
              : <div className="tab">No video lists so far.</div>
            }
            <div className="add-container">
              <button
                onClick={() => {
                  dispatch(modalActions.showModal({
                    modalType: MODAL_CONSTANTS.ADD_VIDEO_LIST_MODAL,
                    modalProps: {}
                  }))
                }}
              >Add New List</button>
              <div className={`hidden ${isAdding ? 'active' : ''}`}>
                <input
                  type="text"
                  value={newVideoList}
                  onChange={({ target }) => setNewVideoList(target.value)}
                />
                <button
                  onClick={() => {
                    dispatch(videoListAction.createNewVideoList(newVideoList))
                    setAdding(false)
                    setNewVideoList('')
                  }}
                >Add</button>
              </div>
            </div>
          </div>

          <div className="videos-list">
            <div className="title">
              <div className="left">
                <div
                  className="add"
                  onClick={() => {
                    dispatch(modalActions.showModal({
                      modalType: MODAL_CONSTANTS.ADD_VIDEO_TO_LIST_MODAL,
                      modalProps: {
                        videoList: videoLists[activeTabIndex]
                      }
                    }))
                  }}
                >
                  Add
                </div>

                <div
                  className="edit"
                  onClick={() => {
                    dispatch(modalActions.showModal({
                      modalType: MODAL_CONSTANTS.EDIT_VIDEO_LIST_MODAL,
                      modalProps: {
                        videoList: videoLists[activeTabIndex]
                      }
                    }))
                  }}
                >
                  Edit
                </div>
              </div>

              <div className="name">
                {videoLists[activeTabIndex] ? videoLists[activeTabIndex].name : 'All Videos'}
              </div>
              <div
                className="delete"
                onClick={() => {
                  dispatch(videoListAction.deleteVideoList(videoLists[activeTabIndex]._id))
                }}
              >Delete</div>
            </div>
            <div className="list">
              {videos.length ?
                videos.map(video => <VideoCard key={video._id} video={video} />)
                : null
              }
            </div>
          </div>
        </div>
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