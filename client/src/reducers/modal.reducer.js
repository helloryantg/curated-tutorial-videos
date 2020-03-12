import MODAL_CONSTANTS from '../constants/modal.constants'

const initialState = {
  modalType: null,
  modalProps: {
    open: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MODAL_CONSTANTS.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type
      }
    
    case MODAL_CONSTANTS.HIDE_MODAL:
      return initialState

    default:
      return state
  }
}