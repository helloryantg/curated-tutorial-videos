import React, { useState, useEffect } from 'react'
import './AddVideoCard.scss'
import {
  IoIosAdd
} from 'react-icons/io'
import { connect } from 'react-redux'
import modalActions from '../../actions/modal.action'
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
            modalType: MODAL_CONSTANTS.ADD_VIDEO_TO_LIST,
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