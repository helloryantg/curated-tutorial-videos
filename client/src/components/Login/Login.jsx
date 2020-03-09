import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './Login.scss'
import { login } from '../../actions/user.action'

const initialCreds = {
  email: '',
  password: ''
}

const initialError = {
  email: '',
  password: ''
}

function Login(props) {
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
  }, [creds.email, creds.password, error.email, error.password])

  return (
    <div className="Login">
      <div className="header">
        <div className="title">LOGIN</div>
        <div className="description">If you have an account, please log in</div>
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
      </div>

      <div className="button-container">
        <button
          onClick={() => submitLogin()}
        >LOGIN</button>
      </div>
    </div>
  )
}

const mapState = state => {

}

export default connect(mapState)(Login)