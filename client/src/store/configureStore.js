import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/reducer.js'
import modalReducers from '../reducers/modal.reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
  return createStore(
    combineReducers({
      reducers,
      modalReducers
    }),
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
}