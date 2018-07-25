import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import requestReducer, { requestActions } from './request'

// Action
export const actions = {
  request: requestActions
}

// Reducer
const rootReducer = combineReducers({
  request: requestReducer,
  router: routerReducer
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
