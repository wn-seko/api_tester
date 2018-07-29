import { ActionCreatorsMapObject } from 'redux'

export enum ActionTypes {
  GET = '[REQUEST]GET',
  GET_SUCCESS = '[REQUEST]GET_SUCCESS',
  GET_FAILURE = '[REQUEST]GET_FAILURE',
  POST = '[REQUEST]POST',
  POST_SUCCESS = '[REQUEST]POST_SUCCESS',
  POST_FAILURE = '[REQUEST]POST_FAILURE',
  PUT = '[REQUEST]PUT',
  PUT_SUCCESS = '[REQUEST]PUT_SUCCESS',
  PUT_FAILURE = '[REQUEST]PUT_FAILURE',
  DELETE = '[REQUEST]DELETE',
  DELETE_SUCCESS = '[REQUEST]DELETE_SUCCESS',
  DELETE_FAILURE = '[REQUEST]DELETE_FAILURE'
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
  params: any
  data: any
  method: string
}
