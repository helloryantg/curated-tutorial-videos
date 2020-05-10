// React
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './Workspace.scss'
// Components
import Tab from '../../components/Tab/Tab'
import VideoWorkspace from '../../pages/VideoWorkspace/VideoWorkspace'

const DEFAULT_TAB = 'Search'

function Workspace(props) {
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)

  console.log(currentTab)

  return (
    <div className="Workspace">
      <Tab 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
      />
      <VideoWorkspace />
    </div>
  )
}

const mapState = ({ reducers }) => ({

})

export default connect(mapState)(Workspace)