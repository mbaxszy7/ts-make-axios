// export enum Methods {
//   GET = 'get',
//   POST = 'post',
//   PUT = 'put',
//   DELETE = 'delete',
//   OPTIONS = 'options',
//   HEAD = 'head',
//   PATCH = 'patch'
// }

export type Methods =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Methods
  data?: any
  params?: any
  headers?: {
    [propName: string]: string
  }
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponseConfig {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponseConfig> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponseConfig
}
