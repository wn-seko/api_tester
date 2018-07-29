import { ThunkDispatch } from 'redux-thunk'
import { requestGet, requestPost, requestPut, requestDelete } from '../../libs/request'
import { RootState } from '../index'
import { ActionTypes, ActionUnion, createAction, RequestSettings, Response } from './types'

// Actions
export const actions = {
  getAction: () => createAction({ type: ActionTypes.GET }),
  getSuccess: (response: Response, settings: RequestSettings) =>
    createAction({ type: ActionTypes.GET_SUCCESS, payload: { response, settings } }),
  getFailure: (response: Response, settings: RequestSettings) =>
    createAction({ type: ActionTypes.GET_FAILURE, payload: { response, settings } }),
  postAction: () => createAction({ type: ActionTypes.POST }),
  postSuccess: (response: Response, settings: RequestSettings) =>
    createAction({ type: ActionTypes.POST_SUCCESS, payload: { response, settings } }),
  postFailure: (response: Response, settings: RequestSettings) =>
    createAction({ type: ActionTypes.POST_FAILURE, payload: { response, settings } }),
  putAction: () => createAction({ type: ActionTypes.PUT }),
  putSuccess: (response: Response, settings: RequestSettings) =>
    createAction({ type: ActionTypes.PUT_SUCCESS, payload: { response, settings } }),
  putFailure: (response: Response, settings: RequestSettings) =>
    createAction({ type: ActionTypes.PUT_FAILURE, payload: { response, settings } }),
  deleteAction: () => createAction({ type: ActionTypes.DELETE }),
  deleteSuccess: (response: Response, settings: RequestSettings) =>
    createAction({ type: ActionTypes.DELETE_SUCCESS, payload: { response, settings } }),
  deleteFailure: (response: Response, settings: RequestSettings) =>
    createAction({ type: ActionTypes.DELETE_FAILURE, payload: { response, settings } })
}

export type Action = ActionUnion<typeof actions>
export type Dispatch = ThunkDispatch<RootState, undefined, Action>

// Thunk Actions
export const thunkActions = {
  requestGet: (baseURL: string, url: string, headers: any, params: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, params, data: {}, method: 'get' }
      dispatch(actions.getAction())

      return requestGet(baseURL, url, headers, params)
        .then(response => {
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.getSuccess(filteredResponse, settings))
        })
        .catch(result => {
          const response = result.response || {}
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.getFailure(filteredResponse, settings))
        })
    }
  },
  requestPost: (baseURL: string, url: string, headers: any, data: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, params: {}, data, method: 'post' }
      dispatch(actions.postAction())

      return requestPost(baseURL, url, headers, data)
        .then(response => {
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.postSuccess(filteredResponse, settings))
        })
        .catch(result => {
          const response = result.response || {}
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.postFailure(filteredResponse, settings))
        })
    }
  },
  requestPut: (baseURL: string, url: string, headers: any, data: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, params: {}, data, method: 'put' }
      dispatch(actions.putAction())

      return requestPut(baseURL, url, headers, data)
        .then(response => {
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.putSuccess(filteredResponse, settings))
        })
        .catch(result => {
          const response = result.response || {}
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.putFailure(filteredResponse, settings))
        })
    }
  },
  requestDelete: (baseURL: string, url: string, headers: any, params: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, params, data: {}, method: 'delete' }
      dispatch(actions.deleteAction())

      return requestDelete(baseURL, url, headers, params)
        .then(response => {
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.deleteSuccess(filteredResponse, settings))
        })
        .catch(result => {
          const response = result.response || {}
          const filteredResponse = { status: response.status, data: response.data }
          dispatch(actions.deleteFailure(filteredResponse, settings))
        })
    }
  }
}

export const requestActions = { ...actions, ...thunkActions }
