// React
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './AddVideoListModal.scss'
// Actions
import modalActions from '../../../actions/modal.action'
import videoListActions from '../../../actions/videoList.action'

function AddVideoListModal(props) {
  const {
    dispatch,
  } = props

  const [videoList, setVideoList] = useState({
    name: ''
  })

  return (
    <div className="AddVideoListModal">
      <header>
        <div className="title">ADD VIDEO LIST</div>
        <div
          className="close"
          onClick={() => dispatch(modalActions.hideModal())}
        >
          Close
        </div>
      </header>

      <div className="main">
        <div className="item">
          <label>Name: </label>
          <input
            type="text"
            value={videoList.name}
            onChange={({ target }) => {
              setVideoList({
                name: target.value
              })
            }}
          />
        </div>

        <div className="button-container">
          <button
            onClick={() => {
              dispatch(videoListActions.createNewVideoList(videoList))
              dispatch(modalActions.hideModal())
            }}
          >ADD</button>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {}
}

export default connect(mapState)(AddVideoListModal)