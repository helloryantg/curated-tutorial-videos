// React
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
// Styles
import './Tabs.scss'
// Components
import Tab from '../../components/Tab/Tab'

function Tabs(props) {
  const tabs = [
    { label: 'Search' },
    { label: 'My Lists' }
  ]

  const [allTabs, setAllTabs] = useState([...tabs])
  const [clickedTab, setClickedTab] = useState(allTabs[0])

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
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => ({})

export default connect(mapState)(Tabs)