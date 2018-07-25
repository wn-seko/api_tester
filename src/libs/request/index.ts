import axios, { AxiosPromise } from 'axios'

export const requestPost = (baseURL: string, url: string, headers: any, data: any): AxiosPromise => {
  const request = axios.create({ baseURL, responseType: 'json' })
  return request({ url, headers, method: 'post', data })
}
