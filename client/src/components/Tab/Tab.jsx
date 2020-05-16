// React
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
// Styles
import './Tab.scss'
// Dependencies
import { 
  IoMdSearch,
  IoIosList,
  IoIosArrowForward
} from "react-icons/io"
// Utils
import { isEmpty } from '../../utils/object'
// Actions
import videoListAction from '../../actions/videoList.action'

function Tab(props) {
  const {
    setCurrentTab,
    user,
    dispatch,
    videoLists
  } = props

  const tabs = [
    { label: 'Search', icon: IoMdSearch },
    { label: 'My Lists', icon: IoIosList },
  ]

  const [allTabs, setAllTabs] = useState([...tabs])

  useEffect(() => {
    if (!isEmpty(user)) {
      dispatch(videoListAction.getUserVideoLists(user._id))
    }
  }, [user, dispatch])

  useEffect(() => {
    const userTabs = videoLists.map(list => {
      return {
        label: list.name,
        icon: IoIosArrowForward,
        list,
      }
    })

    setAllTabs([...tabs, ...userTabs])
  }, [videoLists])

  console.log(videoLists)

  return (
    <div className="Tab">
      <div className="tabs">
        {allTabs.map((tab, index) => (
          <div 
            className="tab" 
            key={`${tab.label}-${index}`}
            onClick={() => setCurrentTab(tab.label)}
          >
            <tab.icon />
            <p>{tab.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({
  videoLists: reducers.videoLists,
  user: reducers.user,
})

export default connect(mapState)(Tab)