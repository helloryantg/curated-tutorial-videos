// React
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
// Redux
import { connect } from 'react-redux'
// Styles
import './App.scss'
// Actions
import { 
  getUserFromToken 
} from '../../actions/user.action'
// Pages
import AuthPage from '../../pages/AuthPage/AuthPage'
// Components
import Modal from '../Modals/Modals'
import VideoPage from '../../pages/VideoPage/VideoPage'
import VideoWorkspace from '../../pages/VideoWorkspace/VideoWorkspace'
// Utils
import { isEmpty } from '../../utils/object'

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
          <Route exact path='/video' component={VideoPage}/>
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