// React
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// Redux
import { connect } from "react-redux"
// Styles
import "./App.scss"
// Actions
import { getUserFromToken } from "../../actions/user.action"
// Pages
import AuthPage from "../../pages/AuthPage/AuthPage"
import ListPage from "../../pages/ListPage/ListPage"
// Components
import Modal from "../Modals/Modals"
import NavBar from "../../components/NavBar/NavBar"
import VideoPage from "../../pages/VideoPage/VideoPage"
import VideoWorkspace from "../../pages/VideoWorkspace/VideoWorkspace"
// import Workspace from "../../components/Workspace/Workspace"
import VidWorkspace from '../../components/VidWorkspace/VidWorkspace'
// Utils
import { isEmpty } from "../../utils/object"

function App(props) {
  const { dispatch, user, modal } = props

  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    dispatch(getUserFromToken())
  }, [dispatch])

  useEffect(() => {
    setLoggedIn(!isEmpty(user))
  }, [user])

  useEffect(() => {}, [modal])

  if (!isLoggedIn) {
    return (
      <div className="App">
        <AuthPage />
      </div>
    )
  }

  return (
    <div className="App">
      <NavBar />
      {modal.modalProps.open ? <Modal modal={modal} /> : null}
      <Router>
        <Switch>
          {/* <Route exact path='/' component={Workspace}/> */}
          <Route exact path="/" component={VidWorkspace} />
          {/* <Route exact path="/" component={VideoWorkspace} /> */}
          <Route exact path="/list/:listId" component={ListPage} />
          <Route exact path="/video/:id" component={VideoPage} />
        </Switch>
      </Router>
    </div>
  )
}

const mapState = ({ reducers, modalReducers }) => {
  return {
    user: reducers.user,
    modal: modalReducers,
  }
}

export default connect(mapState)(App)
