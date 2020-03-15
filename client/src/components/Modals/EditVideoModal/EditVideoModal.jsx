// React
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './EditVideoModal.scss'
// Actions
import modalActions from '../../../actions/modal.action'
import videoActions from '../../../actions/video.action'

function EditVideoModal(props) {
  const {
    dispatch
  } = props

  const [video, setVideo] = useState(props.data.video)

  return (
    <div className="EditVideoModal">
      <div className="header">
        <div className="title">Edit Video</div>
        <div
          className="close"
          onClick={() => {
            dispatch(modalActions.hideModal())
          }}
        >
          Close
        </div>
      </div>

      <div className="main">
        <div className="title">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={video.title}
            onChange={({ target }) => {
              setVideo({
                ...video,
                title: target.value
              })
            }}
          />
        </div>

        <div className="url">
          <label htmlFor="">Url</label>
          <input
            type="text"
            value={video.url}
            onChange={({ target }) => {
              setVideo({
                ...video,
                url: target.value
              })
            }}
          />
        </div>

        <div className="description">
          <label htmlFor="">Description</label>
          <textarea
            value={video.description}
            onChange={({ target }) => {
              setVideo({
                ...video,
                description: target.value
              })
            }}
          ></textarea>
        </div>
      </div>

      <div className="button">
        <button
          onClick={() => {
            dispatch(videoActions.editVideo(video))
          }}
        >Edit</button>
      </div>
    </div>
  )
}

const mapState = () => ({})

export default connect(mapState)(EditVideoModal)