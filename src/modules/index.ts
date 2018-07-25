import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

// Action
export const actions = {}

// Reducer
const rootReducer = combineReducers({
  router: routerReducer
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
