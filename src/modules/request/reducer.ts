import { Action } from './actions'
import { ActionTypes, State } from './types'

export const initialState: State = {
  loading: {
    access: false
  },
  level: '',
  response: {
    status: 0,
    data: null
  },
  history: []
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.POST:
      return {
        ...state,
        loading: { ...state.loading, access: true }
      }
    case ActionTypes.POST_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, access: false },
        level: 'success',
        response: action.payload.response,
        history: state.history.concat([
          { response: action.payload.response, settings: action.payload.settings, level: 'success' }
        ])
      }
    case ActionTypes.POST_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, access: false },
        level: 'error',
        response: action.payload.response,
        history: state.history.concat([
          { response: action.payload.response, settings: action.payload.settings, level: 'error' }
        ])
      }
    default:
      return state
  }
}
