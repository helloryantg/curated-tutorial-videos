// React
import React, { useState, useEffect } from "react"
// Redux
import { connect } from "react-redux"
// Styles
import "./List.scss"
// Components
import VideoCard from "../../components/VideoCard/VideoCard"
// Actions
import modalActions from "../../actions/modal.action"
// Constants
import MODAL_CONSTANTS from "../../constants/modal.constants"
// Dependencies
import { FiEdit, FiPlusSquare, FiXSquare } from "react-icons/fi"

function List({ activeTabIndex, dispatch, videoLists, videos }) {
  const [currentVideos, setCurrentVideos] = useState(videos)

  useEffect(() => {
    setCurrentVideos(videos)
  }, [videos])

  return (
    <div className="List">
      <div className="title">
        <div className="left">
          <div
            className="add"
            onClick={() => {
              dispatch(
                modalActions.showModal({
                  modalType: MODAL_CONSTANTS.ADD_VIDEO_TO_LIST_MODAL,
                  modalProps: {
                    videoList: videoLists[activeTabIndex],
                  },
                })
              )
            }}
          >
            <FiPlusSquare />
          </div>

          <div
            className="edit"
            onClick={() => {
              dispatch(
                modalActions.showModal({
                  modalType: MODAL_CONSTANTS.EDIT_VIDEO_LIST_MODAL,
                  modalProps: {
                    videoList: videoLists[activeTabIndex],
                  },
                })
              )
            }}
          >
            <FiEdit />
          </div>
        </div>

        <div className="name">
          <a href={`list/${videoLists[activeTabIndex]._id}`} >
            {videoLists[activeTabIndex]
              ? videoLists[activeTabIndex].name
              : "All Videos"}
          </a>
        </div>
        <div
          className="delete"
          onClick={() => {
            dispatch(
              modalActions.showModal({
                modalType: MODAL_CONSTANTS.DELETE_VIDEO_LIST_MODAL,
                modalProps: {
                  videoList: videoLists[activeTabIndex],
                },
              })
            )
          }}
        >
          <FiXSquare />
        </div>
      </div>
      <div className="list">
        {currentVideos.length
          ? currentVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))
          : null}
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => {
  return {
    videoLists: reducers.videoLists,
    videos: reducers.videos,
  }
}

export default connect(mapState)(List)
