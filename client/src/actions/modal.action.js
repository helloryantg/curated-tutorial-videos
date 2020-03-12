import MODAL_CONSTANTS from '../constants/modal.constants'

export const showModal = ({ modalProps, modalType }) => dispatch => {
  dispatch({
    type: MODAL_CONSTANTS.SHOW_MODAL,
    modalProps: {
      ...modalProps,
      open: true
    },
    modalType
  })
}

export const hideModal = () => dispatch => {
  dispatch({
    type: MODAL_CONSTANTS.HIDE_MODAL
  })
}

export default {
  showModal,
  hideModal
}