// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './EditVideoModal.scss'
// Actions
import modalActions from '../../../actions/modal.action'
import videoActions from '../../../actions/video.action'
// Services
import videoServices from '../../../services/video.service'
// Components
import CustomButton from '../../../components/CustomButton/CustomButton'

function EditVideoModal(props) {
  const {
    dispatch,
  } = props

  const [video, setVideo] = useState({})  

  useEffect(() => {
    getVideo()
  }, [])

  const getVideo = async () => {
    const video = await videoServices.getVideo(props.data.video._id)

    setVideo(video)
  }

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

      <CustomButton 
        text='Edit'
        onClick={() => {
          dispatch(videoActions.editVideo(video))
          dispatch(modalActions.hideModal())
        }}
      />
    </div>
  )
}

const mapState = () => ({})

export default connect(mapState)(EditVideoModal)