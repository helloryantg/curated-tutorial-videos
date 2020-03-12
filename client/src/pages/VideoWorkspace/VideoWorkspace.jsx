import React, { useState, useEffect } from 'react'
import './VideoWorkspace.scss'
import NavBar from '../../components/NavBar/NavBar'
import videoListAction from '../../actions/videoList.action'
import { connect } from 'react-redux'
import VideoCard from '../../components/VideoCard/VideoCard'
import { isEmpty } from '../../utils/object'
import modalActions from '../../actions/modal.action'
import MODAL_CONSTANTS from '../../constants/modal.constants'

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

  useEffect(() => {
    if (!isEmpty(user)) {
      dispatch(videoListAction.getUserVideoLists(user._id))
    }
  }, [user, dispatch])

  useEffect(() => {
  }, [videoLists, videos.length])

  useEffect(() => {
    if (videoLists.length) {
      dispatch(videoListAction.getVideoListVideos(videoLists[activeTabIndex]._id))
    }
  }, [activeTabIndex, dispatch, videoLists])

  return (
    <div className="VideoWorkspace">
      <NavBar />
      <div className="main">
        <div className="tabs">
          <div className="title">My Lists</div>
          {videoLists.length ?
            videoLists.map((video, index) => (
              <div
                className={`tab ${activeTabIndex === index ? 'active' : ''}`}
                key={video._id}
                onClick={() => setActiveTabIndex(index)}
              >{
                  video.name}
              </div>
            ))
            : <div className="tab">No video lists so far.</div>
          }
          <div className="add-container">
            <button
              onClick={() => setAdding(!isAdding)}
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
            >Edit</div>
            <div className="name">
              {videoLists[activeTabIndex] ? videoLists[activeTabIndex].name : 'All Videos'}
            </div>
            <div className="delete">Delete</div>
          </div>
          <div className="list">
            {videos.length ?
              videos.map(video => <VideoCard key={video._id} video={video} />)
              : <div className="empty">No videos</div>
            }
          </div>
        </div>
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