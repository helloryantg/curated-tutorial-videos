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
import Modal from '../Modals/Modals'

function App(props) {
  const {
    dispatch,
    user,
    modal
  } = props

  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    dispatch(getUserFromToken())
  }, [dispatch])

  useEffect(() => {
    setLoggedIn(!isEmpty(user))
  }, [user])

  useEffect(() => {
  }, [modal])

  let body
  if (!isLoggedIn) {
    body = <AuthPage />
  } else {
    body = <VideoWorkspace />
  }

  return (
    <div className="App">
      {modal.modalProps.open ? <Modal modal={modal} /> : null}
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

const mapState = ({ reducers, modalReducers }) => {
  return {
    user: reducers.user,
    modal: modalReducers
  }
}

export default connect(mapState)(App)