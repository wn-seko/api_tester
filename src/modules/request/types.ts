import { ActionCreatorsMapObject } from 'redux'

export enum ActionTypes {
  POST = '[REQUEST]POST',
  POST_SUCCESS = '[REQUEST]POST_SUCCESS',
  POST_FAILURE = '[REQUEST]POST_FAILURE'
}

export function createAction<T extends { type: ActionTypes }>(d: T): T {
  return d
}

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>

// State Types
export interface LoadingState {
  access: boolean
}

export interface State {
  level: string
  loading: LoadingState
  response: Response
  history: Array<{
    level: string
    settings: RequestSettings
    response: Response
  }>
}

export interface Response {
  status: number
  data: any
}

export interface RequestSettings {
  baseURL: string
  url: string
  headers: any
  data: any
  method: string
}
