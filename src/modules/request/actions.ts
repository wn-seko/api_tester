import { ThunkDispatch } from 'redux-thunk'
import { requestPost } from '../../libs/request'
import { RootState } from '../index'
import { ActionTypes, ActionUnion, createAction } from './types'

// Actions
export const actions = {
  postAction: () =>
    createAction({
      type: ActionTypes.POST
    }),
  postSuccess: (status: number, data: any) =>
    createAction({
      type: ActionTypes.POST_SUCCESS,
      payload: { status, data }
    }),
  postFailure: (status: number, data: any) =>
    createAction({
      type: ActionTypes.POST_FAILURE,
      payload: { status, data }
    })
}

export type Action = ActionUnion<typeof actions>
export type Dispatch = ThunkDispatch<RootState, undefined, Action>

// Thunk Actions
export const thunkActions = {
  requestPost: (baseURL: string, url: string, headers: any, data: any) => {
    return (dispatch: Dispatch) => {
      dispatch(actions.postAction())

      return requestPost(baseURL, url, headers, data)
        .then(response => {
          dispatch(actions.postSuccess(response.status, response.data))
        })
        .catch(result => {
          dispatch(actions.postFailure(result.response.status, result.response.data))
        })
    }
  }
}

export const requestActions = { ...actions, ...thunkActions }
