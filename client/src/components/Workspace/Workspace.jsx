// React
import React, { useState, useEffect } from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './Workspace.scss'
// Components
import Tabs from '../../components/Tabs/Tabs'
import SearchPage from '../../pages/SearchPage/SearchPage'
import UserLists from '../../components/UserLists/UserLists'

const DEFAULT_TAB = { name: 'search' }

function Workspace(props) {
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)

  const renderBody = tab => {
    switch (tab.name) {
      case 'search':
        return <SearchPage />
      case 'my_lists':
        return <SearchPage />
      case 'user_lists':
        return <UserLists
          tab={tab}
        />

      default:
        return <div>Empty</div>
    }
  }

  return (
    <div className="Workspace">
      <Tabs
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