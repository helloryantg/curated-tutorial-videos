import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './SignUp.scss'
import userAction from '../../actions/user.action'
import { Link } from 'react-router-dom'

const initialCreds = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  displayName: ''
}

const initialError = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  displayName: ''
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

    let firstName = ''
    if (!creds.firstName) {
      firstName = 'First name is required'
    }

    let lastName = ''
    if (!creds.lastName) {
      lastName = 'Last name is required'
    }

    let displayName = ''
    if (!creds.displayName) {
      displayName = 'Display name is required'
    }

    if (!creds.email
      || !creds.password
      || !creds.confirmPassword
      || !creds.firstName
      || !creds.lastName
      || !creds.displayName
    ) {
      return setError({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        displayName
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

    let firstName = error.firstName
    if (creds.firstName) {
      firstName = ''
    }

    let lastName = error.lastName
    if (creds.lastName) {
      lastName = ''
    }

    let displayName = error.displayName
    if (creds.displayName) {
      displayName = ''
    }

    setError({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      displayName
    })
  }, [
    creds.email,
    creds.password,
    creds.confirmPassword,
    creds.firstName,
    creds.lastName,
    creds.displayName,
    error.email,
    error.password,
    error.confirmPassword,
    error.firstName,
    error.lastName,
    error.displayName
  ])

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
        <div className="left">
          <div className="first-name">
            <div className="title">First Name</div>
            <input
              type="text"
              placeholder='John'
              value={creds.firstName}
              onChange={({ target }) => setCreds({
                ...creds,
                firstName: target.value
              })}
            />
            <div className="error">{error.firstName}</div>
          </div>

          <div className="last-name">
            <div className="title">Last Name</div>
            <input
              type="text"
              placeholder='Smith'
              value={creds.lastName}
              onChange={({ target }) => setCreds({
                ...creds,
                lastName: target.value
              })}
            />
            <div className="error">{error.lastName}</div>
          </div>

          <div className="display-name">
            <div className="title">Display Name</div>
            <input
              type="text"
              placeholder='jsmith'
              value={creds.displayName}
              onChange={({ target }) => setCreds({
                ...creds,
                displayName: target.value
              })}
            />
            <div className="error">{error.displayName}</div>
          </div>
        </div>
        <div className="right">
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
  return {}
}

export default connect(mapState)(SignUp)