import React, { useState } from 'react'
import './EditVideoListModal.scss'
import { connect } from 'react-redux'
import modalActions from '../../../actions/modal.action'
import videoListAction from '../../../actions/videoList.action'

function EditVideoListModal(props) {
  const {
    dispatch,
    data
  } = props

  const [videoList, setVideoList] = useState(data.videoList)

  return (
    <div className="EditVideoListModal">
      <header>
        <div className="title">EDIT VIDEO LIST</div>
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
            onChange={({ target }) => setVideoList({
              ...videoList,
              name: target.value
            })} 
          />
        </div>

        <div className="button-container">
          <button
            onClick={() => {
              dispatch(videoListAction.updateVideoList(videoList))
            }}
          >EDIT</button>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {}
}

export default connect(mapState)(EditVideoListModal)