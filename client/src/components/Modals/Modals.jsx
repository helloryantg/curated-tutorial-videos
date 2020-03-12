import React from 'react'
import './Modals.scss'
import { hideModal } from '../../actions/modal.action'
import { connect } from 'react-redux'
import EditVideoListModal from './EditVideoListModal/EditVideoListModal'
import MODAL_CONSTANTS from '../../constants/modal.constants'

const ModalType = ({ type, data }) => {
  switch (type) {
    case MODAL_CONSTANTS.EDIT_VIDEO_LIST_MODAL:
      return <EditVideoListModal />

    default:
      return <div>Empty Modal</div>
  }
} 

function Modals(props) {
  const {
    dispatch,
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