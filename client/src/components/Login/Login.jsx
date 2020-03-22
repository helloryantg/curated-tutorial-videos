// React
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
// Styles
import './Login.scss'
// Actions
import { login } from '../../actions/user.action'
// Components
import Input from '../../components/Input/Input'

const initialCreds = {
  email: '',
  password: ''
}

const initialError = {
  email: '',
  password: ''
}

const options = [
  { option: 'email', placeholder: 'someone@email.com' },
  { option: 'password', placeholder: '********' },
]

function Login(props) {
  const {
    setLoginPage
  } = props

  const [creds, setCreds] = useState(initialCreds)
  const [error, setError] = useState(initialError)

  const submitLogin = () => {
    let email = ''
    if (!creds.email) {
      email = 'Email is required'
    }

    let password = ''
    if (!creds.password) {
      password = 'Password is required'
    }

    if (!creds.email || !creds.password) {
      return setError({
        email,
        password
      })
    }

    props.dispatch(login(creds))
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

    setError({
      email,
      password
    })
  }, [
    creds.email,
    creds.password,
    error.email,
    error.password,
  ])

  return (
    <div className="Login">
      <div className="header">
        <div className="title">Login</div>
        <div className="description">
          If you don't have an account, please {' '}
          <Link
            to="/"
            onClick={() => setLoginPage(false)}
          >
            sign up
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
          onClick={() => submitLogin()}
        >Go</button>
      </div>
    </div>
  )
}

const mapState = state => {

}

export default connect(mapState)(Login)