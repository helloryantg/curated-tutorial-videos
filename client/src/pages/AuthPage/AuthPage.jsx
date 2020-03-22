// React
import React, { useState } from 'react'
// Styles
import './AuthPage.scss'
// Components
import Login from '../../components/Login/Login'
import SignUp from '../../components/SignUp/SignUp'

function AuthPage(props) {
  const [isLoginPage, setLoginPage] = useState(true)

  return (
    <div className="AuthPage">
      <div className="container">
        <div className="logo-container">
          <div className="title">Curated Tutorial Videos</div>
          {/* <div className="bottom"></div> */}
        </div>

        <div className="forms-container">
          {isLoginPage ? 
            <Login 
              setLoginPage={setLoginPage} 
            /> 
            : 
            <SignUp
              setLoginPage={setLoginPage} 
            />
            }
        </div>
      </div>
    </div>
  )
}

export default AuthPage