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
  const [toggled, setToggled] = useState(true)

  const toggleList = (toggled) => {
    setToggled(!toggled)
  }

  const tabs = [
    { label: 'Search', name: 'search', icon: IoMdSearch },
    { label: 'My Lists', name: 'my_lists', icon: IoIosList, onClick: toggleList },
  ]

  const [allTabs, setAllTabs] = useState([...tabs])

  const {
    setCurrentTab,
    user,
    dispatch,
    videoLists
  } = props

  useEffect(() => {
    if (!isEmpty(user)) {
      dispatch(videoListAction.getUserVideoLists(user._id))
    }
  }, [user, dispatch])

  useEffect(() => {
    if (toggled) {
      const userTabs = videoLists.map(list => {
        return {
          className: 'user-list',
          label: list.name,
          name: 'user_lists',
          list,
        }
      })
  
      setAllTabs([...tabs, ...userTabs])
    } else {
      setAllTabs([...tabs])
    }
  }, [videoLists, toggled])

  return (
    <div className="Tab">
      <div className="tabs">
        {allTabs.map((tab, index) => {
          const tabClassName = Object.keys(tab).includes('className') ? tab.className : ''
          const secondaryClick = Object.keys(tab).includes('onClick') ? tab.onClick : null
          return (
            <div 
              className={`tab ${tabClassName}`} 
              key={`${tab.name}-${index}`}
              onClick={() => {
                setCurrentTab(tab)

                if (secondaryClick !== null) {
                  if (tab.label === 'My Lists') {
                    secondaryClick(toggled)
                  }
                }
              }}
            >
              {Object.keys(tab).includes('icon') ? <tab.icon /> : null}
              <p>{tab.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({
  videoLists: reducers.videoLists,
  user: reducers.user,
})

export default connect(mapState)(Tab)