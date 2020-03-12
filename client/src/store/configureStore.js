import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/reducer.js'
import modalReducers from '../reducers/modal.reducer'

export default function configureStore() {
  return createStore(
    combineReducers({
      reducers,
      modalReducers
    }),
    applyMiddleware(thunk)
  )
}