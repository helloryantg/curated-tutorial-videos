import React, { useState } from 'react'
import './AuthPage.scss'
import Login from '../../components/Login/Login'

function AuthPage(props) {
  const [isLoginPage, setLoginPage] = useState(true)

  // TODO add signup page
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

export default AuthPage