// React
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
// Styles
import './SignUp.scss'
// Actions
import userAction from '../../actions/user.action'
// Components
import Input from '../../components/Input/Input'

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

const options = [
  { option: 'email', placeholder: 'someone@email.com' },
  { option: 'password', placeholder: '********' },
  { option: 'confirmPassword', placeholder: '********' },
  { option: 'firstName', placeholder: 'John' },
  { option: 'lastName', placeholder: 'Smith' },
  { option: 'displayName', placeholder: 'jsmith' },
]

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
        <div className="title">Signup</div>
        <div className="description">
          Welcome! If you already have an account, please {' '}
          <Link
            href="/"
            onClick={() => setLoginPage(true)}
          >
            login
          </Link>
          .
        </div>
      </div>
      
      <div className="form">
        {options.map(({ option, placeholder }, index) => {
          return (
            <Input 
              key={index}
              option={option}
              placeholder={placeholder}
              value={creds[option]}
              onChange={({ value }) => setCreds({
                ...creds,
                [option]: value
              })}
              error={error[option]}
            />
          )
        })}
      </div>
      <div className="button-container">
        <button
          onClick={() => submitSignUp()}
        >Join</button>
      </div>
    </div>
  )
}

const mapState = state => {
  return {}
}

export default connect(mapState)(SignUp)