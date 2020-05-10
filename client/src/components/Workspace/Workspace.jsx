// React
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './Workspace.scss'
// Components
import Tab from '../../components/Tab/Tab'
import VideoWorkspace from '../../pages/VideoWorkspace/VideoWorkspace'
import SearchPage from '../../pages/SearchPage/SearchPage'

const DEFAULT_TAB = 'Search'

function Workspace(props) {
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)

  const renderBody = tab => {
    switch(tab) {
      case 'Search':
        return <SearchPage />
      case 'My Lists':
        return <VideoWorkspace />

      default:
        return <div>Empty</div>
    }
  }

  return (
    <div className="Workspace">
      <Tab 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
      />
      {renderBody(currentTab)}
    </div>
  )
}

const mapState = ({ reducers }) => ({

})

export default connect(mapState)(Workspace)