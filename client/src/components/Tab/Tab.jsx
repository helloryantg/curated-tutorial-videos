// React
import React from 'react'
// Styles
import './Tab.scss'
// Dependencies
import { 
  IoMdSearch,
  IoIosList,
} from "react-icons/io"

function Tab(props) {
  const {
    setCurrentTab
  } = props

  const tabs = [
    { label: 'Search', icon: IoMdSearch },
    { label: 'My Lists', icon: IoIosList },
  ]

  return (
    <div className="Tab">
      <div className="tabs">
        {tabs.map((tab, index) => (
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

export default Tab