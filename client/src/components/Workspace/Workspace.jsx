// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './Workspace.scss'
// Components
import Tab from '../../components/Tab/Tab'

function Workspace(props) {
  return (
    <div className="Workspace">
      <Tab />
    </div>
  )
}

const mapState = ({ reducers }) => ({

})

export default connect(mapState)(Workspace)