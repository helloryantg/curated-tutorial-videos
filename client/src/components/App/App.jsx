import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import userService from '../../services/user.service'
import { setUser } from '../../actions/user.action'
import AuthPage from '../../pages/AuthPage/AuthPage'

function App(props) {
  const {
    dispatch
  } = props

  useEffect(() => {
    dispatch(setUser(userService.getUser()))
  }, [dispatch])

  let body
  if (props.user) {
    body = <AuthPage />
  }

  return (
    <div className="App">
      {body}
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.reducers.user
  }
}

export default connect(mapState)(App)
