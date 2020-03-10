import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './SignUp.scss'
import userAction from '../../actions/user.action'
import { Link } from 'react-router-dom'

const initialCreds = {
  email: '',
  password: '',
  confirmPassword: ''
}

const initialError = {
  email: '',
  password: '',
  confirmPassword: ''
}

function SignUp(props) {
  const {
    setLoginPage
  } = props

  const [creds, setCreds] = useState(initialCreds)
  const [error, setError] = useState(initialError)

  const submitSignUp = () => {
    let email = ''
    if (!creds.email) {
      email = 'Email is required'
    }

    let password = ''
    if (!creds.password) {
      password = 'Password is required'
    }

    let confirmPassword = ''
    if (!creds.confirmPassword) {
      confirmPassword = 'Password is required'
    }

    if (!creds.email || !creds.password || !creds.confirmPassword) {
      return setError({
        email,
        password,
        confirmPassword
      })
    }
    
    props.dispatch(userAction.signUp(creds))
  }

  useEffect(() => {
    let email = error.email
    if (creds.email) {
      email = ''
    }

    let password = error.password
    if (creds.password) {
      password = ''
    }

    let confirmPassword = error.confirmPassword
    if (creds.confirmPassword) {
      confirmPassword = ''
    }

    setError({
      email,
      password,
      confirmPassword
    })
  }, [creds.email, creds.password, creds.confirmPassword, error.email, error.password, error.confirmPassword])

  return (
    <div className="SignUp">
      <div className="header">
        <div className="title">SIGNUP</div>
        <div className="description">
          Welcome! If you already have an account, please login.
          <Link 
            href="/"
            onClick={() => setLoginPage(true)}
          >
            Login
          </Link>
        </div>
      </div>
      <div className="form">
        <div className="email">
          <div className="title">Email</div>
          <input
            type="text"
            placeholder='someone@email.com'
            value={creds.email}
            onChange={({ target }) => setCreds({
              ...creds,
              email: target.value
            })}
          />
          <div className="error">{error.email}</div>
        </div>

        <div className="password">
          <div className="title">Password</div>
          <input
            type="password"
            placeholder='**********'
            value={creds.password}
            onChange={({ target }) => setCreds({
              ...creds,
              password: target.value
            })}
          />
          <div className="error">{error.password}</div>
        </div>

        <div className="confirm-password">
          <div className="title">Confirm Password</div>
          <input
            type="password"
            placeholder='**********'
            value={creds.confirmPassword}
            onChange={({ target }) => setCreds({
              ...creds,
              confirmPassword: target.value
            })}
          />
          <div className="error">{error.confirmPassword}</div>
        </div>
      </div>

      <div className="button-container">
        <button
          onClick={() => submitSignUp()}
        >SIGN UP</button>
      </div>
    </div>
  )
}

const mapState = state => {

}

export default connect(mapState)(SignUp)