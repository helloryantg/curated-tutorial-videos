// React
import React, { useEffect, useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './UserLists.scss'
// Actions
import videoListActions from '../../actions/videoList.action'
// Utils
import { isEmpty } from '../../utils/object'
// Components
import Card from '../../components/Card/Card'

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
      {videos.map(video => {
        return (
          <Card
            key={video._id} 
            video={video}
          />
        )
      })}
    </div>
  )
}

const mapState = ({ reducers }) => ({
  reducerVideos: reducers.videos.filter(video => video.title.toLowerCase().includes(reducers.searchText.toLowerCase())),
})

export default connect(mapState)(UserLists)