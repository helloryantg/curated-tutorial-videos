// React
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './AddVideoModal.scss'
// Actions
import modalActions from '../../../actions/modal.action'
import videoAction from '../../../actions/video.action'
// Components
import CustomButton from '../../../components/CustomButton/CustomButton'

function AddVideoModal(props) {
  const {
    dispatch,
    data,
    user,
  } = props

  const [video, setVideo] = useState({
    title: '',
    url: '',
    description: '',
    videoListId: data.videoList._id,
    userId: user._id,
  })

  return (
    <div className="AddVideoModal">
      <header>
        <div className="title">ADD VIDEO</div>
        <div
          className="close"
          onClick={() => dispatch(modalActions.hideModal())}
        >
          Close
        </div>
      </header>

      <div className="main">
        <div className="item">
          <label>Title: </label>
          <input
            type="text"
            value={video.title}
            onChange={({ target }) => setVideo({
              ...video,
              title: target.value
            })}
          />
        </div>
        <div className="item">
          <label>URL: </label>
          <input
            type="text"
            value={video.url}
            onChange={({ target }) => setVideo({
              ...video,
              url: target.value
            })}
          />
        </div>
        <div className="item">
          <label>Description: </label>
          <input
            type="text"
            value={video.description}
            onChange={({ target }) => setVideo({
              ...video,
              description: target.value
            })}
          />
        </div>

        <CustomButton
          text='Add'
          onClick={() => {
            dispatch(videoAction.createVideo(video))
            dispatch(modalActions.hideModal())
          }}
        />
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({
  user: reducers.user
})

export default connect(mapState)(AddVideoModal)