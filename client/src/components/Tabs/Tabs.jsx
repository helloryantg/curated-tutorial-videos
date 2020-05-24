// React
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
// Styles
import './Tabs.scss'
// Components
import Tab from '../../components/Tab/Tab'
// Actions
import videoListAction from '../../actions/videoList.action'

function Tabs(props) {
  const {
    user,
    dispatch,
    reducerVideoLists,
  } = props

  const tabs = [
    { label: 'Search' },
    { label: 'My Lists' }
  ]

  const [allTabs, setAllTabs] = useState([...tabs])
  const [clickedTab, setClickedTab] = useState(allTabs[0])
  const [videoLists, setVideoLists] = useState([])

  useEffect(() => {
    dispatch(videoListAction.getUserVideoLists(user._id))
  }, [user, dispatch])

  useEffect(() => {
    if (reducerVideoLists.length) {
      setVideoLists(reducerVideoLists)
    }
  }, [reducerVideoLists])

  console.log(videoLists)

  return (
    <div className="Tabs">
      <div className="tabs">
        {allTabs.map(tab => {
          return (
            <Tab
              key={tab.label} 
              tab={tab}
              clickedTab={clickedTab}
              setClickedTab={setClickedTab}
            />
          )
        })}
        {videoLists.map(list => {
          return (
            <Tab 
              key={list._id}
              tab={{ label: list.name}}
              clickedTab={clickedTab}
              setClickedTab={setClickedTab}
            />
          )
        })}
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({
  reducerVideoLists: reducers.videoLists,
  user: reducers.user
})

export default connect(mapState)(Tabs)