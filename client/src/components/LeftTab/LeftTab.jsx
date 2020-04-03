// React
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './LeftTab.scss'
// Actions
import modalActions from '../../actions/modal.action'
import videoListAction from '../../actions/videoList.action'
// Constants
import MODAL_CONSTANTS from '../../constants/modal.constants'

function LeftTab({
  activeTabIndex,
  dispatch,
  isAdding,
  newVideoList,
  setActiveTabIndex,
  setAdding,
  setNewVideoList,
  videoLists,
}) {
  return (
    <div className="LeftTab">
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
  )
}

export default connect()(LeftTab)