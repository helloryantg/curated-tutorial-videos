// React
import React, { useEffect, useState } from 'react'
// Redux
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
// // Actions
// import videoListAction from '../../actions/videoList.action'

function Tab(props) {
  const { 
    tab,
    user,
    dispatch,
    reducerVideoLists,
    clickedTab,
    setClickedTab,
  } = props

  // const [videoLists, setVideoLists] = useState([])

  // useEffect(() => {
  //   if (tab.label === 'My Lists' && !isEmpty(user)) {
  //     dispatch(videoListAction.getUserVideoLists(user._id))
  //   }
  // }, [user, dispatch])

  // useEffect(() => {
  //   if (reducerVideoLists.length) {
  //     setVideoLists(reducerVideoLists)
  //   }
  // }, [reducerVideoLists])

  const renderIcon = () => {
    switch(tab.label) {
      case 'Search':
        return <IoMdSearch />
      case 'My Lists':
        return <IoIosList />
      default:
        return <div>E</div>
    }
  }

  return (
    <div 
      className={`Tab ${clickedTab.label === tab.label ? 'active' : ''}`}
      onClick={() => setClickedTab(tab)}  
    >
      <div className="row">
        <div className="icon">{renderIcon()}</div>
        <div className="label">{tab.label}</div>
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({
  user: reducers.user,
  reducerVideoLists: reducers.videoLists
})

export default connect(mapState)(Tab)