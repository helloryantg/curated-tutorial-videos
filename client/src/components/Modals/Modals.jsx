// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './Modals.scss'
// Constants
import MODAL_CONSTANTS from '../../constants/modal.constants'
// Components
import AddVideoModal from './AddVideoModal/AddVideoModal'
import EditVideoModal from './EditVideoModal/EditVideoModal'
import EditVideoListModal from './EditVideoListModal/EditVideoListModal.jsx'

function Modals(props) {
  const {
    modal
  } = props

  const data = modal.modalProps

  let modalType
  switch (modal.modalType) {
    case MODAL_CONSTANTS.EDIT_VIDEO_LIST_MODAL:
      modalType = <EditVideoListModal data={data} />
      break

    case MODAL_CONSTANTS.ADD_VIDEO_TO_LIST_MODAL:
      modalType = <AddVideoModal data={data} />
      break

    case MODAL_CONSTANTS.EDIT_VIDEO_MODAL:
      modalType = <EditVideoModal data={data} />
      break

    default:
      return <div>Empty Modal</div>
  }

  return (
    <div className="Modals">
      {modalType}
    </div>
  )
}

const mapState = (state) => {
  return {}
}

export default connect(mapState)(Modals)