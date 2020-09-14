import React from 'react';
import './DeleteVideoListModal.scss';
import { IoIosClose } from "react-icons/io";
import { connect } from 'react-redux';
import modalActions from '../../../actions/modal.action';
import { GiCancel } from "react-icons/gi";
import videoListAction from '../../../actions/videoList.action';

function DeleteVideoListModal(props) {
  const {
    dispatch,
    data,
  } = props;

  const handleDeleteVideoList = () => {
    dispatch(videoListAction.deleteVideoList(data.videoList._id));
    hideModal();
  }

  const hideModal = () => dispatch(modalActions.hideModal());

  return (
    <div className="DeleteVideoListModal">
      <section 
        className="top"
        onClick={hideModal}
      >
        <div className="delete-icon-container">
          <IoIosClose />
        </div>
      </section>
      <section className="middle">
        <div className="delete-icon-container">
          <GiCancel />
        </div>
      </section>
      <section className="text-container">
        <h1>Are you sure?</h1>
        <h4>Do you really want to delete this video list?</h4>
        <h4>Deleting this list will also delete the videos and cannot be undone.</h4>
      </section>
      <section className="buttons-container">
        <button 
          className="cancel"
          onClick={hideModal}
        >Cancel</button>
        <button
          className="delete"
          onClick={() => handleDeleteVideoList()}
        >Delete</button>
      </section>
    </div> 
  )
}

export default connect()(DeleteVideoListModal);
