import React from 'react'
import './NavBar.scss'
import { connect } from 'react-redux'
import { isEmpty } from '../../utils/object'
import { Link } from 'react-router-dom'
import userActions from '../../actions/user.action'

function NavBar(props) {
  const { 
    user,
    dispatch
  } = props
  const initials = !isEmpty(user) && user.firstName[0] + user.lastName[0]
  
  return (
    <div className="NavBar">
      <div className="logo">
        CTV
      </div>
      <div className="search"></div>
      <div className="user">
        <div className="initials">{initials}</div>
        <Link 
          to="/"
          onClick={() => dispatch(userActions.logout())} 
        >Logout</Link>
      </div>
    </div>
  )
}

const mapState = ({ reducers }) => {
  return {
    user: reducers.user
  }
}

export default connect(mapState)(NavBar)