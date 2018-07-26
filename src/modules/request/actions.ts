import { ThunkDispatch } from 'redux-thunk'
import { requestPost } from '../../libs/request'
import { RootState } from '../index'
import { ActionTypes, ActionUnion, createAction, RequestSettings, Response } from './types'

// Actions
export const actions = {
  postAction: () =>
    createAction({
      type: ActionTypes.POST
    }),
  postSuccess: (response: Response, settings: RequestSettings) =>
    createAction({
      type: ActionTypes.POST_SUCCESS,
      payload: { response, settings }
    }),
  postFailure: (response: Response, settings: RequestSettings) =>
    createAction({
      type: ActionTypes.POST_FAILURE,
      payload: { response, settings }
    })
}

export type Action = ActionUnion<typeof actions>
export type Dispatch = ThunkDispatch<RootState, undefined, Action>

// Thunk Actions
export const thunkActions = {
  requestPost: (baseURL: string, url: string, headers: any, data: any) => {
    return (dispatch: Dispatch) => {
      const settings = { baseURL, url, headers, data, method: 'post' }
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
  }
}

export const requestActions = { ...actions, ...thunkActions }
