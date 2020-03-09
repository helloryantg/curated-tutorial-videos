import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import { 
  getUserFromToken 
} from '../../actions/user.action'
import AuthPage from '../../pages/AuthPage/AuthPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import VideoWorkspace from '../../pages/VideoWorkspace/VideoWorkspace'
// import { isEmpty } from '../../utils/object'

function App(props) {
  // const [isLoggedIn, setLoggedIn] = useState(!isEmpty(props.user))
  const {
    dispatch
  } = props

  useEffect(() => {
    dispatch(getUserFromToken())
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            {/* {!isEmpty(props.user) ? <Redirect to='/auth' /> : <VideoWorkspace />} */}
            <VideoWorkspace />
          </Route>
          <Route exact path='/auth'>  
            <AuthPage />
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
