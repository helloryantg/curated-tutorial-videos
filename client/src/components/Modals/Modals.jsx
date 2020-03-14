import React from 'react'
import './Modals.scss'
import { connect } from 'react-redux'
import MODAL_CONSTANTS from '../../constants/modal.constants'
import EditVideoListModal from './EditVideoListModal/EditVideoListModal.jsx'
import AddVideoModal from './AddVideoModal/AddVideoModal'

const ModalType = ({ type, data }) => {
  switch (type) {
    case MODAL_CONSTANTS.EDIT_VIDEO_LIST_MODAL:
      return <EditVideoListModal data={data} />
    
    case MODAL_CONSTANTS.ADD_VIDEO_TO_LIST:
      return <AddVideoModal data={data} />

    default:
      return <div>Empty Modal</div>
  }
} 

function Modals(props) {
  const {
    modal
  } = props

  return (
    <div className="Modals">
      <ModalType 
        type={modal.modalType}
        data={modal.modalProps}
      />
    </div>
  )
}

const mapState = (state) => {
  return {}
}

export default connect(mapState)(Modals)