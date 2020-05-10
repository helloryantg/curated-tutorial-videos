// React
import React from 'react'
// Styles
import './Tab.scss'

function Tab(props) {
  const tabs = [
    'Search'
  ]

  return (
    <div className="Tab">
      <div className="tabs">
        {tabs.map(tab => (
          <div className="tab">{tab}</div>
        ))}
      </div>
    </div>
  )
}

export default Tab