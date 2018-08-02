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
  history: [],
  favorite: []
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.GET:
    case ActionTypes.POST:
    case ActionTypes.PUT:
    case ActionTypes.DELETE:
      return { ...state, loading: { ...state.loading, access: true } }
    case ActionTypes.GET_SUCCESS:
    case ActionTypes.POST_SUCCESS:
    case ActionTypes.PUT_SUCCESS:
    case ActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, access: false },
        level: 'success',
        response: action.payload.response,
        history: state.history.concat([
          {
            response: action.payload.response,
            settings: action.payload.settings,
            timestamp: action.payload.timestamp,
            level: 'success'
          }
        ])
      }
    case ActionTypes.GET_FAILURE:
    case ActionTypes.POST_FAILURE:
    case ActionTypes.PUT_FAILURE:
    case ActionTypes.DELETE_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, access: false },
        level: 'error',
        response: action.payload.response,
        history: state.history.concat([
          {
            response: action.payload.response,
            settings: action.payload.settings,
            timestamp: action.payload.timestamp,
            level: 'error'
          }
        ])
      }
    case ActionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.concat([
          {
            timestamp: action.payload.timestamp,
            settings: action.payload.settings
          }
        ])
      }
    case ActionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(f => f.timestamp !== action.payload.timestamp)
      }
    default:
      return state
  }
}
