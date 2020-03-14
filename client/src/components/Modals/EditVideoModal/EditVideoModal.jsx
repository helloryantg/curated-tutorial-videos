// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './EditVideoModal.scss'
// Actions
import modalActions from '../../../actions/modal.action'

function EditVideoModal(props) {
  const {
    dispatch
  } = props

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
          <input type="text"/>
        </div>

        <div className="url">
          <label htmlFor="">Url</label>
          <input type="text"/>
        </div>

        <div className="description">
          <label htmlFor="">Description</label>
          <textarea name="" id="" cols="30" rows="4"></textarea>
        </div>
      </div>

      <div className="button">
        <button>Edit</button>
      </div>
    </div>
  )
}

const mapState = () => ({})

export default connect(mapState)(EditVideoModal)