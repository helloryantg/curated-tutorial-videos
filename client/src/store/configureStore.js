import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/reducer.js'

export default function configureStore() {
  return createStore(
    combineReducers({
      reducers
    }),
    applyMiddleware(thunk)
  )
}