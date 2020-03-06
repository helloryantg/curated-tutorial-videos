import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './AuthPage.scss'
import Login from '../Login/Login'

function AuthPage(props) {
  const [creds, setCreds] = useState()
  const [isLoginPage, setLoginPage] = useState(true)

  return (
    <div className="AuthPage">
      <div className="container">
        <div className="logo-container">
          <div className="top">
            <div className="title">Curated Tutorial Videos</div>
          </div>
          <div className="bottom"></div>
        </div>
        <div className="forms-container">
          {isLoginPage ? <Login /> : null}
        </div>
      </div>
    </div>
  )
}

const mapState = state => {

}

export default connect(mapState)(AuthPage)