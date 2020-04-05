// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './VideoList.scss'
// Components
import LeftTab from '../../components/LeftTab/LeftTab'
import List from '../../components/List/List'

function VideoList({
  activeTabIndex,
  isAdding,
  newVideoList,
  setActiveTabIndex,
  setAdding,
  setNewVideoList,
  videoLists,
}) {
  return (
    <div className="VideoList">
      <LeftTab
        activeTabIndex={activeTabIndex}
        isAdding={isAdding}
        newVideoList={newVideoList}
        setActiveTabIndex={setActiveTabIndex}
        setAdding={setAdding}
        setNewVideoList={setNewVideoList}
        videoLists={videoLists}
      />

      <List
        activeTabIndex={activeTabIndex}
      />
    </div>
  )
}

export default VideoList