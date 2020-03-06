import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import userService from '../../services/user.service'
import { setUser } from '../../actions/user.action'

function App(props) {
  useEffect(() => {
    getUserFromLocalStorage()
  }, [])

  const getUserFromLocalStorage = () => {
    props.dispatch(setUser(userService.getUser()))
  }

  if (!props.user) {
    // send to signup or login
  }

  return (
    <div className="App">

    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.reducers.user
  }
}

export default connect(mapState)(App)
