import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './components/App/App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const store = configureStore()

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById('root')
)
