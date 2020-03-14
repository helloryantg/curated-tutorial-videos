// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './AddVideoCard.scss'
// Dependencies
import {
  IoIosAdd
} from 'react-icons/io'
// Actions
import modalActions from '../../actions/modal.action'
// Constants
import MODAL_CONSTANTS from '../../constants/modal.constants'

function AddVideoCard(props) {
  const {
    dispatch,
    currentList
  } = props

  const [list, setList] = useState(currentList)

  useEffect(() => {
    setList(currentList)
  }, [currentList])

  return (
    <div className="AddVideoCard">
      <IoIosAdd
        onClick={() => {
          dispatch(modalActions.showModal({
            modalType: MODAL_CONSTANTS.ADD_VIDEO_TO_LIST_MODAL,
            modalProps: {
              videoList: list
            }
          }))
        }}
      />
    </div>
  )
}

const mapState = state => {
  return {}
}

export default connect(mapState)(AddVideoCard)