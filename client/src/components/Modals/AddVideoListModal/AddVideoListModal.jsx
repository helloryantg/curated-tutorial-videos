// React
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './AddVideoListModal.scss'
// Actions
import modalActions from '../../../actions/modal.action'
import videoListActions from '../../../actions/videoList.action'
// Components
import CustomButton from '../../../components/CustomButton/CustomButton'
import Input from '../../../components/Input/Input'

const initialVideoList = { name: '', description: '', }

function AddVideoListModal({ dispatch }) {
  const [videoList, setVideoList] = useState(initialVideoList)
  const [error, setError] = useState('')

  const onSubmit = () => {
    if (!videoList.name) {
      setError('Name field cannot be empty')
    } else {
      dispatch(videoListActions.createNewVideoList(videoList))
      dispatch(modalActions.hideModal())
    }
  }

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
        <Input
          option='name'
          placeholder='Video list name'
          value={videoList.name}
          onChange={({ value }) => {
            setVideoList({
              ...videoList,
              name: value,
            })
          }}
          error={error}
        />

        <Input
          option='description'
          placeholder='Video list description'
          value={videoList.description}
          onChange={({ value }) => {
            setVideoList({
              ...videoList,
              description: value,
            })
          }}
        />

        <CustomButton
          text='Add'
          onClick={onSubmit}
        />
      </div>
    </div>
  )
}

export default connect()(AddVideoListModal)