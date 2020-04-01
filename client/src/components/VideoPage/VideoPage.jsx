// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './VideoPage.scss'
// Actions
import modalActions from '../../actions/modal.action'
import videoListAction from '../../actions/videoList.action'
// Dependencies
import Loader from 'react-loader-spinner'

function VideoPage(props) {
  return (
    <div className="VideoPage">
      VideoPage
    </div>
  )
}

export default connect()(VideoPage)