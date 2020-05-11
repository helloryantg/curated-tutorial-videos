// React
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// Styles
import './SearchPage.scss'
// Services
import videoAction from '../../actions/video.action'
// Components
import VideoCard from '../../components/VideoCard/VideoCard'

function SearchPage(props) {
  const {
    allVideos,
    dispatch,
  } = props

  const [videos, setVideos] = useState([])

  useEffect(() => {
    dispatch(videoAction.getAllVideos())
  }, []) 

  useEffect(() => {
    if (allVideos.length) {
      setVideos(allVideos)
    } else {
      setVideos([])
    }
  }, [allVideos])

  return (
    <div className="SearchPage">
      <div className="videos">
        {videos
          .map(video => {
          return <VideoCard 
            video={video}
            key={video._id}
          />
        })}
      </div>      
    </div>
  )
}

const mapState = ({ reducers }) => ({
  allVideos: reducers.allVideos.filter(video => video.title.toLowerCase().includes(reducers.searchText.toLowerCase())),
  reduxSearchText: reducers.searchText,
})

export default connect(mapState)(SearchPage)