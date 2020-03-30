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
}
