import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import { 
  getUserFromToken 
} from '../../actions/user.action'
import AuthPage from '../../pages/AuthPage/AuthPage'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import VideoWorkspace from '../../pages/VideoWorkspace/VideoWorkspace'
import { isEmpty } from '../../utils/object'

function App(props) {
  const {
    dispatch,
    user
  } = props

  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    dispatch(getUserFromToken())
  }, [dispatch])

  useEffect(() => {
    setLoggedIn(!isEmpty(user))
  }, [user])

  let body
  if (isLoggedIn) {
    body = <VideoWorkspace />
  } else {
    body = <AuthPage />
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            {body}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.reducers.user
  }
}

export default connect(mapState)(App)
