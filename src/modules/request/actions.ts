import { ThunkDispatch } from 'redux-thunk'
import { requestGet, requestPost, requestPut, requestDelete } from '../../libs/request'
import { RootState } from '../index'
import { ActionTypes, ActionUnion, createAction, RequestSettings, Response } from './types'

// Actions
export const actions = {
  getAction: () => createAction({ type: ActionTypes.GET }),
  getSuccess: (response: Response, settings: RequestSettings, timestamp: number) =>
    createAction({ type: ActionTypes.GET_SUCCESS, payload: { response, settings, timestamp } }),
  getFailure: (response: Response, settings: RequestSettings, timestamp: number) =>
    createAction({ type: ActionTypes.GET_FAILURE, payload: { response, settings, timestamp } }),
  postAction: () => createAction({ type: ActionTypes.POST }),
  postSuccess: (response: Response, settings: RequestSettings, timestamp: number) =>
    createAction({ type: ActionTypes.POST_SUCCESS, payload: { response, settings, timestamp } }),
  postFailure: (response: Response, settings: RequestSettings, timestamp: number) =>
    createAction({ type: ActionTypes.POST_FAILURE, payload: { response, settings, timestamp } }),
  putAction: () => createAction({ type: ActionTypes.PUT }),
  putSuccess: (response: Response, settings: RequestSettings, timestamp: number) =>
    createAction({ type: ActionTypes.PUT_SUCCESS, payload: { response, settings, timestamp } }),
  putFailure: (response: Response, settings: RequestSettings, timestamp: number) =>
    createAction({ type: ActionTypes.PUT_FAILURE, payload: { response, settings, timestamp } }),
  deleteAction: () => createAction({ type: ActionTypes.DELETE }),
  deleteSuccess: (response: Response, settings: RequestSettings, timestamp: number) =>
    createAction({ type: ActionTypes.DELETE_SUCCESS, payload: { response, settings, timestamp } }),
  deleteFailure: (response: Response, settings: RequestSettings, timestamp: number) =>
    createAction({ type: ActionTypes.DELETE_FAILURE, payload: { response, settings, timestamp } }),
  addFavorite: (settings: RequestSettings) =>
    createAction({ type: ActionTypes.ADD_FAVORITE, payload: { settings, timestamp: Date.now() } }),
  removeFavorite: (timestamp: number) => createAction({ type: ActionTypes.REMOVE_FAVORITE, payload: { timestamp } })
}

export type Action = ActionUnion<typeof actions>
export type Dispatch = ThunkDispatch<RootState, undefined, Action>

// Thunk Actions
export const thunkActions = {
  requestGet: (baseURL: string, url: string, headers: any, params: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, params, data: {}, method: 'get' }
      const timestamp = Date.now()
      dispatch(actions.getAction())

      return requestGet(baseURL, url, headers, params)
        .then(response => {
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.getSuccess(filteredResponse, settings, timestamp))
        })
        .catch(result => {
          const response = result.response || {}
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.getFailure(filteredResponse, settings, timestamp))
        })
    }
  },
  requestPost: (baseURL: string, url: string, headers: any, data: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, params: {}, data, method: 'post' }
      const timestamp = Date.now()
      dispatch(actions.postAction())

      return requestPost(baseURL, url, headers, data)
        .then(response => {
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.postSuccess(filteredResponse, settings, timestamp))
        })
        .catch(result => {
          const response = result.response || {}
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.postFailure(filteredResponse, settings, timestamp))
        })
    }
  },
  requestPut: (baseURL: string, url: string, headers: any, data: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, params: {}, data, method: 'put' }
      const timestamp = Date.now()
      dispatch(actions.putAction())

      return requestPut(baseURL, url, headers, data)
        .then(response => {
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.putSuccess(filteredResponse, settings, timestamp))
        })
        .catch(result => {
          const response = result.response || {}
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.putFailure(filteredResponse, settings, timestamp))
        })
    }
  },
  requestDelete: (baseURL: string, url: string, headers: any, params: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, params, data: {}, method: 'delete' }
      const timestamp = Date.now()
      dispatch(actions.deleteAction())

      return requestDelete(baseURL, url, headers, params)
        .then(response => {
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.deleteSuccess(filteredResponse, settings, timestamp))
        })
        .catch(result => {
          const response = result.response || {}
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.deleteFailure(filteredResponse, settings, timestamp))
        })
    }
  }
}

export const requestActions = { ...actions, ...thunkActions }
