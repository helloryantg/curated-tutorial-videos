// React
import React, { useEffect, useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './UserLists.scss'
// Actions
import videoListActions from '../../actions/videoList.action'
import modalActions from '../../actions/modal.action'
// Utils
import { isEmpty } from '../../utils/object'
// Components
import Card from '../../components/Card/Card'
// Constants
import MODAL_CONSTANTS from '../../constants/modal.constants'

function UserLists(props) {
  const {
    tab,
    dispatch,
    reducerVideos,
  } = props

  const [videos, setVideos] = useState([])

  useEffect(() => {
    if (!isEmpty(tab)) {
      dispatch(videoListActions.getVideoListVideos(tab.list._id))
    }
  }, [tab, dispatch])

  useEffect(() => {
    setVideos(reducerVideos)
  }, [reducerVideos])

  return (
    <div className="UserLists">
      {videos.length ? videos.map(video => {
        return (
          <Card
            key={video._id} 
            video={video}
          />
        )
      })
      :
      <div className="empty-list">
        <div 
          className="add-video"
          onClick={() => {
            dispatch(modalActions.showModal({
              modalType: MODAL_CONSTANTS.ADD_VIDEO_TO_LIST_MODAL,
              modalProps: {
                videoList: tab.list
              }
            }))
          }}
        >Add Video to List</div>
      </div>
    }
    </div>
  )
}

const mapState = ({ reducers }) => ({
  reducerVideos: reducers.videos.filter(video => video.title.toLowerCase().includes(reducers.searchText.toLowerCase())),
})

export default connect(mapState)(UserLists)