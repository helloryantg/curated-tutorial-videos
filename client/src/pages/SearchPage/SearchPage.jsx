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

  const [searchText, setSearchText] = useState('')
  const [videos, setVideos] = useState([])

  useEffect(() => {
    dispatch(videoAction.getAllVideos())
  }, [])

  useEffect(() => {
    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchText.toLocaleLowerCase()))
    console.log(filteredVideos)
    setVideos(filteredVideos)
  }, [searchText])

  useEffect(() => {
    if (allVideos.length) {
      setVideos(allVideos)
    } else {
      setVideos([])
    }
  }, [allVideos])

  // console.log(videos)

  return (
    <div className="SearchPage">
      <div className="search-bar">
        <input type="text" value={searchText} onChange={({ target }) => setSearchText(target.value)} />
      </div>
      <div className="videos">
        {allVideos.map(video => {
          return <VideoCard 
            video={video}
          />
        })}
      </div>      
    </div>
  )
}

const mapState = ({ reducers }) => ({
  allVideos: reducers.allVideos,
})

export default connect(mapState)(SearchPage)