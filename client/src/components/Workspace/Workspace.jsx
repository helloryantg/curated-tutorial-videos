// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
// Styles
import './Workspace.scss'
// Components


function Workspace(props) {
  return (
    <div className="Workspace">
      Workspace
    </div>
  )
}

const mapState = ({ reducers }) => ({

})

export default connect(mapState)(Workspace)