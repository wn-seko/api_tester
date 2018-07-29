import axios, { AxiosPromise } from 'axios'

export const requestGet = (baseURL: string, url: string, headers: any, params: any): AxiosPromise => {
  const request = axios.create({ baseURL, responseType: 'json' })
  return request({ url, headers, method: 'get', params })
}

export const requestPost = (baseURL: string, url: string, headers: any, data: any): AxiosPromise => {
  const request = axios.create({ baseURL, responseType: 'json' })
  return request({ url, headers, method: 'post', data })
}

export const requestPut = (baseURL: string, url: string, headers: any, data: any): AxiosPromise => {
  const request = axios.create({ baseURL, responseType: 'json' })
  return request({ url, headers, method: 'put', data })
}

export const requestDelete = (baseURL: string, url: string, headers: any, params: any): AxiosPromise => {
  const request = axios.create({ baseURL, responseType: 'json' })
  return request({ url, headers, method: 'delete', params })
}
