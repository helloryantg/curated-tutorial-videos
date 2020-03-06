import React from 'react'
import { connect } from 'react-redux'
import './LoginPage.scss'

function LoginPage(props) {
  return (
    <div className="LoginPage">
      <div className="container">
        <div className="logo-container">
          <div className="top">
            <div className="title">Curated Tutorial Videos</div>
          </div>
          <div className="bottom"></div>
        </div>
        <div className="forms-container">
          <div className="header">
            <div className="title">LOGIN</div>
            <div className="description">If you have an account, please log in</div>
          </div>
          <div className="form">
            <div className="email">
              <div className="title">Email</div>
              <input type="text"/>
            </div>

            <div className="password">
              <div className="title">Password</div>
              <input type="text"/>
            </div>
          </div>

          <div className="button-container">
            <button>LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {

}

export default connect(mapState)(LoginPage)