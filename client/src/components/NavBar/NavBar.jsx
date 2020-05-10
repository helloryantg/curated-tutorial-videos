// React
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
// Styles
import './NavBar.scss'
// Utils
import { isEmpty } from '../../utils/object'
// Actions
import userActions from '../../actions/user.action'
// Dependencies
import { 
  IoMdSearch
} from "react-icons/io"


function NavBar(props) {
  const { 
    user,
    dispatch
  } = props

  const [searchText, setSearchText] = useState('')

  const initials = !isEmpty(user) && user.firstName[0] + user.lastName[0]
  
  return (
    <div className="NavBar">
      <Link to="/" className="logo">
        CTV
      </Link>
      <div className="search">
        <input 
          type="text" 
          value={searchText} 
          onChange={({ target }) => setSearchText(target.value)} 
          placeholder={'Find Videos'}
        />
        <button>
          <IoMdSearch />
        </button>
      </div>
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